import React from "react";
import * as effector from "effector-react";
import { shallow, ShallowWrapper, mount, ReactWrapper } from "enzyme";

import DogDetails from ".";
import { Avatar, notification } from "antd";
import { ActionButtonProps } from "antd/lib/modal";

const setUp = () => {
  return shallow(<DogDetails />);
};

const selectedDog = {
  breed: "bulldog",
  image: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4474.jpg",
  scolded: 3,
};

const spy = jest.spyOn(effector, "useStore");
spy.mockReturnValue(selectedDog);

describe("DogDetails", () => {
  let dogDetailsComponent: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    dogDetailsComponent = setUp();
  });

  it("should work", () => {
    expect(dogDetailsComponent).toMatchSnapshot();
  });

  it("should display the dog details card correctly", () => {
    const cardAvatar = dogDetailsComponent.find("Card").prop("cover") as Avatar;
    const cardTitle = dogDetailsComponent.find("Title").props().children;
    const cardButtons = dogDetailsComponent
      .find("Card")
      .prop("actions") as ActionButtonProps;

    expect(cardAvatar.props.src).toEqual(selectedDog.image);
    expect(cardTitle).toEqual("Bulldog");
    expect(cardButtons[0].props.children).toEqual("Scold!");
    expect(cardButtons[1].props.children).toEqual("Bark!");
  });

  it("should show notification when 'bark!' is clicked", () => {
    const barkSpy = jest.spyOn(notification, "open");
    dogDetailsComponent = mount(<DogDetails />);

    const barkButton = dogDetailsComponent.find(".bark-action");

    barkButton.simulate("click");

    expect(barkSpy).toHaveBeenCalledWith({
      message: "Woof Woof!",
    });
  });

  /* it("should call scoldDog event 'scold!' is clicked", () => {
    const scoldSpy = jest.spyOn(notification, "open");
    dogDetailsComponent = mount(<DogDetails />);

    const scoldButton = dogDetailsComponent.find(".scold-action");

    scoldButton.simulate("click");

    expect(scoldSpy).toHaveBeenCalled();
  }); */
});
