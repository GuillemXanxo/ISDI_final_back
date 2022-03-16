const Usuari = require("../../db/models/Usuari");

const { userRegister } = require("./usuariControllers");

jest.mock("../../db/models/Usuari");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a userRegister middleware", () => {
  describe("When it receives a request with an username already existing", () => {
    test("Then it should call its next method with an error message", async () => {
      const req = {
        body: {
          usuari: "gxanxo",
          contrassenya: "123123",
          nom: "Guillem",
          telefon: 677777777,
        },
      };
      const error = new Error("Alguna cosa ha anat malament en el registre");
      const next = jest.fn();
      Usuari.findOne = jest.fn().mockResolvedValue(true);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
