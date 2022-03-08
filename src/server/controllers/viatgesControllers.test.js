const Viatge = require("../../db/models/Viatge");
const { getViatgesCrono } = require("./viatgesControllers");

jest.mock("../../db/models/Viatge");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a getViatges controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with a list of viatges in the received response", async () => {
      const res = {
        json: jest.fn(),
      };

      const viatges = [
        {
          origen: "Barcelona",
          desti: "Sort",
          places: "3",
        },
      ];

      Viatge.find = jest.fn().mockResolvedValue(viatges);

      await getViatgesCrono(null, res);

      expect(Viatge.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ viatges });
    });
  });
});

/* describe("Given a getViatgesOrigen controller", () => {
  describe("When it receives a response", () => {
    test.only("Then it should call method json with a list of viatges with the received origin in the received response", async () => {
      const res = {
        json: jest.fn(),
      };

      const viatges = [
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
      ];

      Viatge.find = jest.fn().mockResolvedValue(viatges);

      await getViatgesOrigen(null, res);

      expect(Viatge.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ viatges });
    });
  });
}); */
