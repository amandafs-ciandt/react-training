import React, { ChangeEvent } from 'react';
import _ from 'lodash';

import { RadioGroup, FormControlLabel, Radio, Chip } from '@material-ui/core';

import { useStore } from 'effector-react';
import { dogBreedFilter, dogs } from '../../effector/store';
import { toggleFilter } from '../../effector/event';

import { Dog } from '../../shared/types';

import './DogFilter.scss';

const DogFilter = () => {
  const dogList = useStore(dogs);
  const filterOptions = useStore(dogBreedFilter);

  const filterItem = (letter: string) => (
    <div className='dog-filter__item'>
      {_.upperFirst(letter)}{' '}
      <Chip
        label={
          dogList.filter((dog: Dog) => dog.breed.startsWith(letter)).length
        }
        data-testid='dog-item-scolded-value'
        color='secondary'
        size='small'
      />
    </div>
  );

  const breedFilter = filterOptions.map(({ letter }, index) => {
    if (letter !== '') {
      return (
        <FormControlLabel
          key={index}
          value={letter}
          control={<Radio />}
          label={filterItem(letter)}
          data-testid='dog-filter-option'
        />
      );
    } else {
      return (
        <FormControlLabel
          key={index}
          value={letter}
          control={<Radio />}
          label={<div className='dog-filter__item'>All</div>}
          data-testid='dog-filter-option'
        />
      );
    }
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    toggleFilter(e.target.value);
  };

  return (
    <div className='dog-filter'>
      <RadioGroup row name='dog-filter' onChange={onChange}>
        {breedFilter}
      </RadioGroup>
    </div>
  );
};

export default DogFilter;
