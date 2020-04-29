import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import * as effector from "effector-react";
import notistack from "notistack";
import * as events from "../../stores/dogList/dogListEvents";

import DogDetails from ".";

const setUpShallowRendering = () => {
  return shallow(<DogDetails />);
};

const selectedDog = {
  breed: "bulldog",
  image: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4474.jpg",
  scolded: 3,
};

jest.mock("notistack", () => ({
  useSnackbar: jest.fn(),
}));

const closeSnackbar = jest.fn();
const enqueueSnackbar = jest.fn();

jest.spyOn(notistack, "useSnackbar").mockImplementation(() => {
  return { enqueueSnackbar, closeSnackbar };
});

const selectedDogSpy = jest.spyOn(effector, "useStore");
selectedDogSpy.mockReturnValue(selectedDog);

describe("DogDetails", () => {
  let dogDetailsComponent: ShallowWrapper;

  beforeEach(() => {
    dogDetailsComponent = setUpShallowRendering();
  });

  it("should render correctly", () => {
    expect(dogDetailsComponent).toMatchSnapshot();
  });

  it("should display the dog details card correctly", () => {
    const cardAvatar = dogDetailsComponent.find(
      '[data-testid="dog-details-image"]'
    );
    const cardTitle = dogDetailsComponent.find(
      '[data-testid="dog-details-breed"]'
    );
    const scoldButton = dogDetailsComponent.find(
      '[data-testid="dog-details-scold-button"]'
    );
    const barkButton = dogDetailsComponent.find(
      '[data-testid="dog-details-bark-button"]'
    );

    expect(cardAvatar.prop("image")).toEqual(selectedDog.image);
    expect(cardTitle.text()).toEqual("Bulldog");
    expect(scoldButton.text()).toEqual("Scold!");
    expect(barkButton.text()).toEqual("Bark!");
  });

  it("should show toast when clicked on bark button", () => {
    const barkButton = dogDetailsComponent.find(
      '[data-testid="dog-details-bark-button"]'
    );

    barkButton.simulate("click");

    expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(enqueueSnackbar).toHaveBeenCalledWith("Woof woof!", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  });

  it("should call scoldDog when clicked on scold button", () => {
    const scoldDogMock = jest
      .spyOn(events, "scoldDog")
      .mockImplementation(() => {});

    const scoldButton = dogDetailsComponent.find(
      '[data-testid="dog-details-scold-button"]'
    );

    scoldButton.simulate("click");

    expect(scoldDogMock).toBeCalled();
  });
});
