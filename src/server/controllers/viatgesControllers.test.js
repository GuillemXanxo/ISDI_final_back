const Viatge = require("../../db/models/Viatge");
const {
  getViatgesCrono,
  deleteViatge,
  createViatge,
} = require("./viatgesControllers");

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

describe("Given a createViatge controller", () => {
  describe("When it receives newViatge as body in req", () => {
    test("Then it should call method json with the created trip and a status 201", async () => {
      const res = {
        json: jest.fn(),
      };
      const status = jest.fn().mockReturnValue(res);
      res.status = status;
      const newViatge = {
        origen: "Barcelona",
        desti: "Sort",
        places: "3",
        horaSortida: "18:00",
        comentaris: "S'accepten animals",
        dones: false,
        data: "2018-02-12",
        id: "2",
      };

      const req = {
        body: newViatge,
      };
      Viatge.create = jest.fn().mockResolvedValue(newViatge);
      await createViatge(req, res);

      expect(Viatge.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(newViatge);
    });
  });

  describe("When it receives an invalid newTrip as body in req", () => {
    test("Then it should call next with an error code 400 an a message 'Viatge invàlid o incorrecte'", async () => {
      const tripToCreate = {};

      const req = {
        body: tripToCreate,
      };

      const next = jest.fn();

      Viatge.create = jest.fn().mockRejectedValue();
      await createViatge(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
