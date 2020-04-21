import React from "react";
import { shallow } from "enzyme";

import { Avatar } from "antd";

import DogItem from ".";

describe("DogItem", () => {
  const dog = {
    breed: "spaniel",
    image: "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_2815.jpg",
    scolded: 3,
  };

  const dogItemComponent = shallow(<DogItem dog={dog} />);

  it("should work", () => {
    expect(dogItemComponent).toMatchSnapshot();
  });

  it("should display the dog information correctly", () => {
    const itemAvatar = dogItemComponent.find("Meta").prop("avatar") as Avatar;
    const itemTitle = dogItemComponent.find("Meta").prop("title");
    const itemTag = dogItemComponent.find("Tag").props().children;

    expect(itemAvatar.props.src).toEqual(
      "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_2815.jpg"
    );
    expect(itemTitle).toEqual("Spaniel");
    expect(itemTag).toEqual(3);
  });
});
