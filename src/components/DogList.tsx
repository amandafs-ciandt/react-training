import React from 'react';
import { useList } from 'effector-react';

import { filtered } from '../effector/store';
import { selectDog } from '../effector/event';

import { List } from 'antd';
import './DogList.scss';

import DogItem from './DogItem';

const DogList = () => {
  const dogsList = useList(filtered, (dog, itemIndex) => {
    return (
      <div className='dog-list__item' onClick={() => selectDog(dog)}>
        <DogItem key={itemIndex} dog={dog} />
      </div>
    );
  });

  return (
    <div className='dog-list'>
      <List className='dog-list__content' itemLayout='horizontal'>
        {dogsList}
      </List>
    </div>
  );
};

export default DogList;
