import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import DogItem from '.';

const dog = {
  breed: 'bulldog',
  image: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_4474.jpg',
  scolded: 3,
};

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<DogItem dog={dog} />);
};

describe('DogItem', () => {
  let dogItemComponent: ShallowWrapper;

  beforeEach(() => {
    dogItemComponent = setUpShallowRendering();
  });

  it('should render correctly', () => {
    expect(dogItemComponent).toMatchSnapshot();
  });

  it('should display the dog information correctly', () => {
    const itemAvatar = dogItemComponent.find('[data-testid="dog-item-avatar"]');
    const itemTitle = dogItemComponent.find('[data-testid="dog-item-breed"]');
    const itemScoldedValue = dogItemComponent.find(
      '[data-testid="dog-item-scolded-value"]'
    );

    expect(itemAvatar.prop('src')).toEqual(dog.image);
    expect(itemTitle.prop('primary')).toEqual('Bulldog');
    expect(itemScoldedValue.prop('label')).toEqual(dog.scolded);
  });
});
