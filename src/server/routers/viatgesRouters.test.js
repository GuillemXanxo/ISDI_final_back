require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const { app } = require("..");
const connectDB = require("../../db");
const Viatge = require("../../db/models/Viatge");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();

  await connectDB(connectionString);
});

beforeEach(async () => {
  await Viatge.create([
    {
      origen: "Barcelona",
      desti: "Sort",
      places: "3",
      id: "3",
    },
    {
      origen: "Sant Cugat",
      desti: "Esterri d'Aneu",
      places: "2",
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

      await request(app).delete(`/viatges/${body.viatges[0].id}`).expect(200);
    });
  });

  describe("When it receives a DELETE request with something different than an id", () => {
    test("Then it should respond with a 400 status code", async () => {
      const noId = "12345";

      await request(app).delete(`/viatges/${noId}`).expect(400);
    });
  });
});
