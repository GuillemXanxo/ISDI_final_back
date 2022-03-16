require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const connectDB = require("../../db");
const Usuari = require("../../db/models/Usuari");
const { app } = require("..");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Usuari.create({
    usuari: "gxanxo",
    contrassenya:
      "$2b$12$KnjkBf7vey3gckkpSkfBn.4kaIvpp4rR/O3ObavMUSLzheB7rx8Zi",
    nom: "Guillem",
    telefon: 666666666,
  });
});

afterEach(async () => {
  await Usuari.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  mongoServer.stop();
});

describe("Given an endpoint /usuari/login", () => {
  describe("When it receives a post request with body {usuari: 'gxanxo': contrassenya:'guillemito'}", () => {
    test("Then it should respond with status 200 and a json with a token", async () => {
      const User = {
        nom: "Guillem",
        usuari: "gxanxo",
        contrassenya: "guillemito",
      };

      const {
        body: { token },
      } = await request(app).post("/usuari/login").send(User).expect(200);

      expect(token).toBeTruthy();
    });
  });

  describe("When it receives a post request with body {usuari: 'gxanxo': contrassenya:'wrongpass'}", () => {
    test("Then it should respond with status 401 and a json with an error property", async () => {
      const wrongUsuari = {
        nom: "Guillem",
        usuari: "gxanxo",
        contrassenya: "wrongpass",
      };

      const { body } = await request(app)
        .post("/usuari/login")
        .send(wrongUsuari)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe("Alguna de les teves dades no és vàlida");
    });
  });

  describe("When it receives a post request with body {usuari: 'wrongUsuari': contrassenya:'guillemito'}", () => {
    test("Then it should respond with status 401 and a json with an error property", async () => {
      const wrongUsuari = {
        non: "Guillem",
        usuari: "wrongUsuari",
        contrassenya: "guillemito",
      };

      const { body } = await request(app)
        .post("/usuari/login")
        .send(wrongUsuari)
        .expect(401);

      expect(body).toHaveProperty("error");
      expect(body.message).toBe("Alguna de les teves dades no és vàlida");
    });
  });
});

describe("Given a usuari/register endpoint", () => {
  describe("When it receives a post request with an existing user", () => {
    test("Then it should respond with an error message `Alguna cosa ha anat malament en el registre`", async () => {
      const userToCreate = {
        name: "Marc",
        username: "gxanxo",
        password: "marc",
      };

      const errorMessage = `Alguna cosa ha anat malament en el registre`;

      const { body } = await request(app)
        .post("/usuari/register")
        .send(userToCreate)
        .expect(400);

      expect(body).toHaveProperty("message");
      expect(body).toHaveProperty("error");
      expect(body.message).toBe(errorMessage);
    });
  });
});
