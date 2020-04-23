import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { when } from 'jest-when';

import * as effector from 'effector-react';
import { dogs, dogBreedFilter } from '../../effector/store';

import DogFilter from '.';

const dogList = [
  {
    breed: 'bulldog',
    image: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_4474.jpg',
    scolded: 3,
  },
  {
    breed: 'beagle',
    image: 'https://images.dog.ceo/breeds/beagle/n02088364_12102.jpg',
    scolded: 1,
  },
  {
    breed: 'collie',
    image: 'https://images.dog.ceo/breeds/collie-border/n02106166_1460.jpg',
    scolded: 0,
  },
];

const filterOptions = [
  { letter: 'a', selected: false },
  { letter: 'b', selected: false },
  { letter: 'c', selected: false },
  { letter: '', selected: false },
];

const selectedDogSpy = jest.spyOn<any, any>(effector, 'useStore');
when(selectedDogSpy).calledWith(dogs).mockReturnValue(dogList);
when(selectedDogSpy).calledWith(dogBreedFilter).mockReturnValue(filterOptions);

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<DogFilter />);
};

const setUpMountedRendering = (): ReactWrapper => {
  return mount(<DogFilter />);
};

describe('DogFilter', () => {
  let dogFilterComponent: ShallowWrapper | ReactWrapper;

  it('should render correctly', () => {
    dogFilterComponent = setUpShallowRendering();

    expect(dogFilterComponent).toMatchSnapshot();
  });

  it('should show all filter options correctly', () => {
    dogFilterComponent = setUpMountedRendering();

    const dogFilterOptions = dogFilterComponent.find('.dog-filter__item');

    expect(dogFilterOptions.length).toEqual(filterOptions.length);

    expect(dogFilterOptions.at(0).text()).toEqual('A 0');
    expect(dogFilterOptions.at(1).text()).toEqual('B 2');
    expect(dogFilterOptions.at(2).text()).toEqual('C 1');
    expect(dogFilterOptions.at(3).text()).toEqual('All');
  });

  it('should call toggle filter when selected an option', () => {
    //TODO
  });
});
