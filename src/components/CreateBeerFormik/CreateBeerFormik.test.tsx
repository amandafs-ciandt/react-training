import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { act } from "@testing-library/react";

import * as events from "../../stores/beerForms/beerFormsEvents";

import { Formik } from "formik";

import CreateBeerFormik from ".";

const mockedNotify = jest.fn();

const fillField = async (field: ShallowWrapper, name: string, value: any) => {
  await act(async () => {
    field.simulate("change", {
      persist: () => {},
      target: {
        name,
        value,
      },
    });
  });

  await act(async () => {
    field.simulate("blur", {
      target: {
        name,
        value,
      },
    });
  });
};

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<CreateBeerFormik notify={mockedNotify} />);
};

const formValues = {
  beerName: "Budweiser",
  beerType: "lager",
  hasCorn: false,
  ingredients: "Water, barley malt, rice, yeast and hops",
};

describe("CreateBeerFormik", () => {
  let createBeerFormikComponent: ShallowWrapper;

  beforeEach(() => {
    createBeerFormikComponent = setUpShallowRendering();
  });

  it("should render correctly", () => {
    expect(createBeerFormikComponent).toMatchSnapshot();
  });

  it("should render title", () => {
    const expectedTitle = "Beer Formik";
    const title = createBeerFormikComponent
      .find(".create-beer-formik__title")
      .text();

    expect(title).toBe(expectedTitle);
  });

  it("should render the form", () => {
    const formExists = createBeerFormikComponent.exists(Formik);

    expect(formExists).toBeTruthy();
  });

  it("should render the inputs", () => {
    const numberOfInputs = 4;
    const formInputs = createBeerFormikComponent
      .find(Formik)
      .dive()
      .find(".create-beer-formik__input-container");

    expect(formInputs.length).toEqual(numberOfInputs);
  });

  it("should have submit button disabled after form is rendered", () => {
    const submitButton = createBeerFormikComponent
      .find(Formik)
      .dive()
      .find('[data-testid="form-submit-button"]');

    expect(submitButton.prop("disabled")).toBeTruthy();
  });

  it("should update beerName when it is changed", () => {
    const formikElement = createBeerFormikComponent.find(Formik).dive();

    fillField(formikElement.find("#beerName"), "beerName", formValues.beerName);

    const newValue = formikElement.find("#beerName").prop("value");

    expect(newValue).toEqual(formValues.beerName);
  });

  it("should update beerType when it is changed", () => {
    const formikElement = createBeerFormikComponent.find(Formik).dive();

    fillField(formikElement.find("#beerType"), "beerType", formValues.beerType);

    const newValue = formikElement.find("#beerType").prop("value");

    expect(newValue).toEqual(formValues.beerType);
  });

  it("should update hasCorn when it is changed", () => {
    const formikElement = createBeerFormikComponent.find(Formik).dive();

    formikElement.find("#hasCorn").simulate("change", {
      persist: () => {},
      target: {
        name: "hasCorn",
        checked: true,
      },
    });

    const newValue = formikElement.find("#hasCorn").prop("checked");

    expect(newValue).toEqual(true);
  });

  it("should update ingredients when it is changed", () => {
    const formikElement = createBeerFormikComponent.find(Formik).dive();

    fillField(
      formikElement.find("#ingredients"),
      "ingredients",
      formValues.ingredients
    );

    const newValue = formikElement.find("#ingredients").prop("value");

    expect(newValue).toEqual(formValues.ingredients);
  });

  it("should submit correctly when form is valid", async () => {
    const preventDefault = jest.fn();
    const resetForm = jest.fn();
    const submitFormMock = jest
      .spyOn(events, "submitForm")
      .mockImplementation((form) => form);

    const formikElement = createBeerFormikComponent.find(Formik).dive();

    await fillField(
      formikElement.find("#beerName"),
      "beerName",
      formValues.beerName
    );
    await fillField(
      formikElement.find("#beerType"),
      "beerType",
      formValues.beerType
    );
    await fillField(
      formikElement.find("#ingredients"),
      "ingredients",
      formValues.ingredients
    );

    await act(async () => {
      createBeerFormikComponent
        .find(Formik)
        .simulate("submit", { preventDefault }, { resetForm });
    });

    expect(resetForm).toHaveBeenCalled();
    expect(mockedNotify).toHaveBeenCalledTimes(1);
    expect(submitFormMock).toHaveBeenCalled();
  });
});
