import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";

import CreateBeerFormikForm from ".";

const onNotifyMock = jest.fn();

const setUp = () => {
  return shallow(<CreateBeerFormikForm notify={onNotifyMock} />);
};

const fillFormValues = (component: ShallowWrapper) => {
  component.find("Input").simulate("change", {
    persist: () => {},
    target: {
      name: "beerName",
      value: "Budweiser",
    },
  });

  component.find("Select").simulate("change", {
    persist: () => {},
    target: {
      name: "beerType",
      value: "lager",
    },
  });

  component.find("Checkbox").simulate("change", {
    persist: () => {},
    target: {
      name: "hasCorn",
      checked: true,
    },
  });

  component.find("TextArea").simulate("change", {
    persist: () => {},
    target: {
      name: "ingredients",
      value: "Water, barley malt, rice, yeast and hops",
    },
  });
};

describe("CreateBeerFormikForm", () => {
  let createBeerFormikFormComponent: ShallowWrapper;

  beforeEach(() => {
    createBeerFormikFormComponent = setUp();
  });

  it("should work", () => {
    expect(createBeerFormikFormComponent).toMatchSnapshot();
  });

  it("should render form correctly", () => {
    const [
      inputLength,
      selectLength,
      checkboxLength,
      textareaLength,
      totalFieldsLength,
    ] = [1, 1, 1, 1, 4];

    expect(createBeerFormikFormComponent.find("Input").length).toBe(
      inputLength
    );
    expect(createBeerFormikFormComponent.find("Select").length).toBe(
      selectLength
    );
    expect(createBeerFormikFormComponent.find("Checkbox").length).toBe(
      checkboxLength
    );
    expect(createBeerFormikFormComponent.find("TextArea").length).toBe(
      textareaLength
    );
    expect(createBeerFormikFormComponent.find(".beer-form__input").length).toBe(
      totalFieldsLength
    );
  });

  it("should show the correct beer types on select", () => {
    const beerTypes = ["ale", "lager", "malt", "stout"];
    const optionElements = createBeerFormikFormComponent.find("Option");

    expect(optionElements.length).toBe(beerTypes.length);

    expect(optionElements.get(0).props.value).toEqual(beerTypes[0]);
    expect(optionElements.get(1).props.value).toEqual(beerTypes[1]);
    expect(optionElements.get(2).props.value).toEqual(beerTypes[2]);
    expect(optionElements.get(3).props.value).toEqual(beerTypes[3]);
  });

  it("should update beerName when it is changed", () => {
    createBeerFormikFormComponent.find("Input").simulate("change", {
      persist: () => {},
      target: {
        name: "beerName",
        value: "Budweiser",
      },
    });

    const newValue = createBeerFormikFormComponent.find("Input").props().value;

    expect(newValue).toEqual("Budweiser");
  });

  it("should update beerType when it is changed", () => {
    createBeerFormikFormComponent.find("Select").simulate("change", {
      persist: () => {},
      target: {
        name: "beerType",
        value: "lager",
      },
    });

    // to do: improve this
    const newValue = createBeerFormikFormComponent.find("Select").props()
      .value as any;

    expect(newValue.target.value).toEqual("lager");
  });

  it("should update hasCorn when it is changed", () => {
    createBeerFormikFormComponent.find("Checkbox").simulate("change", {
      persist: () => {},
      target: {
        name: "hasCorn",
        checked: true,
      },
    });

    const newValue = createBeerFormikFormComponent.find("Checkbox").props()
      .checked;

    expect(newValue).toEqual(true);
  });

  it("should update ingredients when it is changed", () => {
    const ingredientsValue = "Water, barley malt, rice, yeast and hops";

    createBeerFormikFormComponent.find("TextArea").simulate("change", {
      persist: () => {},
      target: {
        name: "ingredients",
        value: ingredientsValue,
      },
    });

    const newValue = createBeerFormikFormComponent.find("TextArea").props()
      .value;

    expect(newValue).toEqual(ingredientsValue);
  });

  it("should have submit button disabled at first", () => {
    const submitButton = createBeerFormikFormComponent.find("Button");

    expect(submitButton.props().disabled).toBeTruthy();
  });

  it("should have submit button enabled when form is valid", () => {
    fillFormValues(createBeerFormikFormComponent);

    const submitButton = createBeerFormikFormComponent.find("Button");

    expect(submitButton.props().disabled).toBeFalsy();
  });
});
