const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call method json with an error", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const mockedResponse = mockResponse();

      notFoundError(null, mockedResponse);

      expect(mockedResponse.json).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives an error with message and status properties and a response", () => {
    test("Then it should call method json with an error with code 500", () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };

      const err = {
        message: "error",
        code: 500,
      };

      const expectedError = { error: true, message: err.message };

      const mockedRes = mockResponse();

      generalError(err, null, mockedRes, null);

      expect(mockedRes.json).toHaveBeenCalledWith(expectedError);
      expect(mockedRes.status).toHaveBeenCalledWith(err.code);
    });
  });

  describe("When it receives an empty error and a response", () => {
    test("Then it should call methods status & json of res with 500 status code & error: true, message: 'General Error' respectively", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const err = {};

      const errorMessage = { error: true, message: "General fail" };
      const status = 500;

      await generalError(err, null, res, null);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });
});
