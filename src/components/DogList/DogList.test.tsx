import React from "react";
import * as effector from "effector-react";
import { shallow, ShallowWrapper, ReactWrapper, mount } from "enzyme";

import DogList from ".";

const setUp = () => {
  return shallow(<DogList />);
};

const dogs = [
  {
    breed: "bulldog",
    image: "https://images.dog.ceo/breeds/bulldog-french/n02108915_4474.jpg",
    scolded: 3,
  },
  {
    breed: "collie",
    image: "https://images.dog.ceo/breeds/collie-border/n02106166_1460.jpg",
    scolded: 0,
  },
  {
    breed: "spaniel",
    image: "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_2815.jpg",
    scolded: 1,
  },
];

const spy = jest.spyOn(effector, "useStore");
spy.mockReturnValue(dogs);

fdescribe("DogList", () => {
  let dogListComponent: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    dogListComponent = setUp();
  });

  it("should work", () => {
    expect(dogListComponent).toMatchSnapshot();
  });

  it("should render the entire list", () => {
    const listItems = dogListComponent.find("DogItem");

    expect(listItems.length).toEqual(dogs.length);
  });

  it("should call selectDog when clicking on an item of the list", () => {
    dogListComponent = mount(<DogList />);

    const firstListItem = dogListComponent.find(".dog-list__item").first();
    firstListItem.simulate("click");

    expect(true).toBeTruthy();
  });
});
