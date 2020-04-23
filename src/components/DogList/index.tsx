import React from 'react';
import { useStore } from 'effector-react';

import { filtered } from '../../effector/store';
import { selectDog } from '../../effector/event';

import './DogList.scss';

import DogItem from '../DogItem';
import { List } from '@material-ui/core';

const DogList = () => {
  const dogsList = useStore(filtered);

  return (
    <div className='dog-list'>
      <List className='dog-list__content'>
        {dogsList.map((dog, itemIndex) => (
          <div
            key={itemIndex}
            className='dog-list__item'
            onClick={() => selectDog(dog)}>
            <DogItem dog={dog} />
          </div>
        ))}
      </List>
    </div>
  );
};

export default DogList;
