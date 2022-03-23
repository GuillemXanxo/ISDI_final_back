require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { app } = require("..");
const connectDB = require("../../db");
const Usuari = require("../../db/models/Usuari");
const Viatge = require("../../db/models/Viatge");

let mongoServer;
let tokenUser;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Usuari.create({
    nom: "Guillem",
    contrassenya:
      "$2b$12$1f0PgmYQHeRtoolaGHXZj.yd1TRlSm7t7y0UnCAViLx/EhWE43S5C",
    usuari: "guillem",
    telefon: 666666666,
  });
  const user = { usuari: "guillem", contrassenya: "guillem" };
  const {
    body: { token },
  } = await request(app).post("/usuari/login").send(user).expect(200);

  tokenUser = token;

  await Viatge.create([
    {
      origen: "Barcelona",
      desti: "Sort",
      places: "3",
      horaSortida: "18:00",
      comentaris: "S'accepten animals",
      dones: "false",
      data: "2018-02-12",
      id: "1",
    },
    {
      origen: "Barcelona",
      desti: "Sort",
      places: "3",
      horaSortida: "18:00",
      comentaris: "S'accepten animals",
      dones: "false",
      data: "2018-02-12",
      id: "2",
    },
  ]);
});

afterEach(async () => {
  await Viatge.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  mongoServer.stop();
});

describe("Given an endpoint /viatges/crono", () => {
  describe("When it receives a GET request", () => {
    test("Then it should respond with status 200 and a list of trips", async () => {
      const { body } = await request(app).get("/viatges/crono").expect(200);

      expect(body).toHaveProperty("viatges");
    });
  });
});

describe("Given a /viatges/:id endpoint", () => {
  describe("When it receives a DELETE request with a trip id", () => {
    test("Then it should respond with a 200 status code", async () => {
      const { body } = await request(app).get("/viatges/crono ");

      await request(app)
        .delete(`/viatges/${body.viatges[0].id}`)
        .set("authorization", `Bearer ${tokenUser}`)
        .expect(200);
    });
  });

  describe("When it receives a DELETE request with something different than an id", () => {
    test("Then it should respond with a 400 status code", async () => {
      const noId = "12345";

      await request(app)
        .delete(`/viatges/${noId}`)
        .set("authorization", `Bearer ${tokenUser}`)
        .expect(400);
    });
  });
});

describe("Given an endpoint viatges/crear", () => {
  describe("When it receives a POST request with a Trip", () => {
    test("Then it should respond with json with the new trip and status 201", async () => {
      const newViatge = {
        origen: "Barcelona",
        desti: "Sort",
        places: "3",
        horaSortida: "18",
        comentaris: "S'accepten animals",
        dones: "false",
        data: "2018-02-12",
        id: "2",
      };

      const { body } = await request(app)
        .post("/viatges/crear")
        .set("authorization", `Bearer ${tokenUser}`)
        .send(newViatge)
        .expect(201);

      expect(body).toHaveProperty("origen", "Barcelona");
    });
  });
});

describe("Given a /viatges/:id endpoint", () => {
  describe("When it receives a GET request with a trip id", () => {
    test("Then it should respond with a 200 status code", async () => {
      const { body } = await request(app).get("/viatges/crono ");

      await request(app).get(`/viatges/${body.viatges[0].id}`).expect(200);
    });
  });
});

describe("Given a viatges/publicats endpoint", () => {
  describe("When a GET request arrives with a correct token", () => {
    test("Then it should send a response with an array of viatges and a status code of 200", async () => {
      const { body } = await request(app)
        .get("/viatges/publicats")
        .set("Authorization", `Bearer ${tokenUser}`)
        .expect(200);

      expect(body).toEqual([]);
    });
  });
});
