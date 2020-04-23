import React from 'react';
import { shallow, ShallowWrapper, ReactWrapper } from 'enzyme';

import CreateBeerFormik from '.';

const mockedNotify = jest.fn();

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<CreateBeerFormik notify={mockedNotify} />);
};

describe('CreateBeerFormik', () => {
  let createBeerFormikComponent: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    createBeerFormikComponent = setUpShallowRendering();
  });

  it('should render correctly', () => {
    expect(createBeerFormikComponent).toMatchSnapshot();
  });

  it('should render title', () => {
    const expectedTitle = 'Beer Formik';
    const title = createBeerFormikComponent
      .find('.create-beer-formik__title')
      .text();

    expect(title).toBe(expectedTitle);
  });

  it('should render the form', () => {
    const formExists = createBeerFormikComponent.exists(
      '.create-beer-formik__form'
    );

    expect(formExists).toBeTruthy();
  });

  it('should render the inputs', () => {
    const numberOfInputs = 4;
    const formInputs = createBeerFormikComponent.find(
      '.create-beer-formik__input-container'
    );

    expect(formInputs.length).toEqual(numberOfInputs);
  });

  it('should have submit button disabled after form is rendered', () => {
    const submitButton = createBeerFormikComponent.find(
      '[data-testid="form-submit-button"]'
    );

    expect(submitButton.props().disabled).toBeTruthy();
  });

  it('should update beerName when it is changed', () => {
    createBeerFormikComponent.find('#beerName').simulate('change', {
      persist: () => {},
      target: {
        name: 'beerName',
        value: 'Budweiser',
      },
    });

    const newValue = createBeerFormikComponent.find('#beerName').props().value;

    expect(newValue).toEqual('Budweiser');
  });

  it('should update beerType when it is changed', () => {
    createBeerFormikComponent.find('#beerType').simulate('change', {
      persist: () => {},
      target: {
        name: 'beerType',
        value: 'lager',
      },
    });

    const newValue = createBeerFormikComponent.find('#beerType').props().value;

    expect(newValue).toEqual('lager');
  });

  it('should update hasCorn when it is changed', () => {
    createBeerFormikComponent.find('#hasCorn').simulate('change', {
      persist: () => {},
      target: {
        name: 'hasCorn',
        checked: true,
      },
    });

    const newValue = createBeerFormikComponent.find('#hasCorn').props().checked;

    expect(newValue).toEqual(true);
  });

  it('should update ingredients when it is changed', () => {
    const ingredientsValue = 'Water, barley malt, rice, yeast and hops';

    createBeerFormikComponent.find('#ingredients').simulate('change', {
      persist: () => {},
      target: {
        name: 'ingredients',
        value: ingredientsValue,
      },
    });

    const newValue = createBeerFormikComponent.find('#ingredients').props()
      .value;

    expect(newValue).toEqual(ingredientsValue);
  });

  it('should submit form correctly', () => {
    //TODO
  });
});
