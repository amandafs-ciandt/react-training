import React from "react";
import App from "./App";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App", () => {
  it("should fetch data from dogs api successfully", async () => {
    /* const expectedResponse = {
      data: {
        message: {
          affenpinscher: [],
          african: [],
          airedale: [],
          akita: [],
          appenzeller: [],
        },
        status: 'success',
      },
    };

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve(expectedResponse)
    );

    expect(axios.get).toHaveBeenCalledWith(`${API}/search?query=react`); */
  });
});
