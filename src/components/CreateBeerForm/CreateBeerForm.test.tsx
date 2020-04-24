import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import CreateBeerForm from '.';

const mockedNotify = jest.fn();

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<CreateBeerForm notify={mockedNotify} />);
};

describe('CreateBeerForm', () => {
  let createBeerFormComponent: ShallowWrapper;
  let useEffect: any;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    createBeerFormComponent = setUpShallowRendering();

    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });

  it('should render correctly', () => {
    expect(createBeerFormComponent).toMatchSnapshot();
  });

  it('should render title', () => {
    const expectedTitle = 'Beer Form';
    const title = createBeerFormComponent
      .find('.create-beer-form__title')
      .text();

    expect(title).toBe(expectedTitle);
  });

  it('should render the form', () => {
    const formExists = createBeerFormComponent.exists(
      '.create-beer-form__form'
    );

    expect(formExists).toBeTruthy();
  });

  it('should render the inputs', () => {
    const numberOfInputs = 4;
    const formInputs = createBeerFormComponent.find(
      '.create-beer-form__input-container'
    );

    expect(formInputs.length).toEqual(numberOfInputs);
  });

  it('should show the correct beer types on select', () => {
    const beerTypes = ['ale', 'lager', 'malt', 'stout'];
    const optionElements = createBeerFormComponent.find(
      '[data-testid="beer-type-option"]'
    );

    expect(optionElements.length).toEqual(beerTypes.length);

    expect(optionElements.get(0).props.value).toEqual(beerTypes[0]);
    expect(optionElements.get(1).props.value).toEqual(beerTypes[1]);
    expect(optionElements.get(2).props.value).toEqual(beerTypes[2]);
    expect(optionElements.get(3).props.value).toEqual(beerTypes[3]);
  });

  it('should have submit button disabled after form is rendered', () => {
    const submitButton = createBeerFormComponent.find(
      '[data-testid="form-submit-button"]'
    );

    expect(submitButton.props().disabled).toBeTruthy();
  });

  it('should have submit button enabled if form is valid', () => {
    createBeerFormComponent.find('#beerName').simulate('change', {
      persist: () => {},
      target: {
        name: 'beerName',
        value: 'Budweiser',
      },
    });

    createBeerFormComponent.find('#beerType').simulate('change', {
      persist: () => {},
      target: {
        name: 'beerType',
        value: 'lager',
      },
    });

    createBeerFormComponent.find('#hasCorn').simulate('change', {
      persist: () => {},
      target: {
        name: 'hasCorn',
        checked: true,
      },
    });

    createBeerFormComponent.find('#ingredients').simulate('change', {
      persist: () => {},
      target: {
        name: 'ingredients',
        value: 'Water, barley malt, rice, yeast and hops',
      },
    });

    const submitButton = createBeerFormComponent.find(
      '[data-testid="form-submit-button"]'
    );

    expect(submitButton.props().disabled).toBeFalsy();
  });

  it('should submit form correctly', () => {
    createBeerFormComponent
      .find('form')
      .simulate('submit', { preventDefault() {} });

    expect(mockedNotify).toHaveBeenCalledTimes(1);
  });
});
