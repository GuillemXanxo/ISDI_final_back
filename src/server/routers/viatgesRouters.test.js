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
    },
    {
      origen: "Sant Cugat",
      desti: "Esterri d'Aneu",
      places: "2",
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

describe("Given an endpoint /viatges/:origen", () => {
  describe("When it receives a GET request", () => {
    test.only("Then it should respond with status 200 and a list of trips with the origin in params", async () => {
      const { body } = await request(app)
        .get("/viatges/Barcelona")
        .send("Barcelona")
        .expect(200);

      expect(body).toHaveProperty("viatgesOrigen");
    });
  });
});
