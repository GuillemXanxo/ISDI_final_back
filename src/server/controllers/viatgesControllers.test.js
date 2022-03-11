const Viatge = require("../../db/models/Viatge");
const { getViatgesCrono, deleteViatge } = require("./viatgesControllers");

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

describe("Given a deleteViatge controller", () => {
  describe("When it a correct id", () => {
    test.only("Then it should call method json with {}", async () => {
      const req = {
        params: {
          id: "2",
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const viatgeToDelete = {
        origen: "Barcelona",
        desti: "Sort",
        places: "3",
        id: "2",
      };
      Viatge.findByIdAndRemove = jest.fn().mockResolvedValue(viatgeToDelete);

      await deleteViatge(req, res, next);

      expect(res.json).toHaveBeenCalledWith({});
    });
  });
});
