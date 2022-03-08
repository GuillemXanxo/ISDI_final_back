const Viatge = require("../../db/models/Viatge");
const { getViatges } = require("./viatgesControllers");

jest.mock("../../db/models/Viatge");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a getViatges controller", () => {
  describe("When it receives a response", () => {
    test.only("Then it should call method json with a list of viatges in the received response", async () => {
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

      await getViatges(null, res);

      expect(Viatge.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ viatges });
    });
  });
});
