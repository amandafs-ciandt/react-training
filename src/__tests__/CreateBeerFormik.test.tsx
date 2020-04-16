import React from 'react';
import { shallow } from 'enzyme';

import CreateBeerFormikForm from '../components/CreateBeerFormikForm';

const onNotifyMock = jest.fn();

describe('CreateBeerFormikForm', () => {
  const formValues = {
    beerName: '',
    beerType: '',
    hasCorn: false,
    ingredients: '',
  };

  const createBeerFormikFormComponent = shallow(
    <CreateBeerFormikForm notify={onNotifyMock} />
  );

  it('should work', () => {
    expect(createBeerFormikFormComponent).toMatchSnapshot();
  });

  it('should render form correctly', () => {
    const [
      inputLength,
      selectLength,
      checkboxLength,
      textareaLength,
      totalFieldsLength,
    ] = [1, 1, 1, 1, 4];

    expect(createBeerFormikFormComponent.find('Input').length).toBe(
      inputLength
    );
    expect(createBeerFormikFormComponent.find('Select').length).toBe(
      selectLength
    );
    expect(createBeerFormikFormComponent.find('Checkbox').length).toBe(
      checkboxLength
    );
    expect(createBeerFormikFormComponent.find('TextArea').length).toBe(
      textareaLength
    );
    expect(createBeerFormikFormComponent.find('.beer-form__input').length).toBe(
      totalFieldsLength
    );
  });

  it('should show the correct beer types on select', () => {
    const beerTypes = ['ale', 'lager', 'malt', 'stout'];
    const optionElements = createBeerFormikFormComponent.find('Option');

    expect(optionElements.length).toBe(beerTypes.length);

    expect(optionElements.get(0).props.value).toEqual(beerTypes[0]);
    expect(optionElements.get(1).props.value).toEqual(beerTypes[1]);
    expect(optionElements.get(2).props.value).toEqual(beerTypes[2]);
    expect(optionElements.get(3).props.value).toEqual(beerTypes[3]);
  });
});
