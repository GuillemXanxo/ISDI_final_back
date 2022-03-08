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
  await Viatge.create({
    origen: "Barcelona",
    desti: "Sort",
    places: "3",
  });
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
    test("Then it should respond with status 200 and a list of tuits", async () => {
      const { body } = await request(app).get("/viatges/crono").expect(200);

      expect(body).toHaveProperty("viatges");
    });
  });
});
