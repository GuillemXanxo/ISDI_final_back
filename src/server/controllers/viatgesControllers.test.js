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
  describe("When it receives a correct id", () => {
    test("Then it should call method findByIdAndDelete with the id", async () => {
      const id = "2";
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Viatge.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteViatge(req, res, next);

      expect(Viatge.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe("When it receives a nonexisting id", () => {
    test("Then it should call next with an error", async () => {
      const req = {
        params: {
          id: "2",
        },
      };
      const next = jest.fn();
      const error = new Error("Could not find the Trip");
      Viatge.findByIdAndRemove = jest.fn().mockRejectedValue(error);

      await deleteViatge(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
