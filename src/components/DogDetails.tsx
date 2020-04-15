import React from 'react';
import { useStore } from 'effector-react';
import _ from 'lodash';

import { selectedDog } from '../effector/store';

import './DogDetails.scss';
import { Button, notification } from 'antd';
import { scoldDog } from '../effector/event';

const DogDetails = () => {
  const dog = useStore(selectedDog);

  const bark = () => {
    notification.open({
      message: 'Woof Woof!',
    });
  };

  return (
    <div className='dog-details'>
      <div className='dog-details__main-info'>
        <div
          className='dog-details__image'
          style={{ backgroundImage: `url(${dog.image})` }}></div>
        <h2>{_.upperFirst(dog.breed)}</h2>
      </div>
      <div className='dog-details__info'>
        <div className='dog-details__actions'>
          <Button onClick={() => scoldDog()}>Scold!</Button>
          <Button onClick={bark}>Bark!</Button>
        </div>
      </div>
    </div>
  );
};

export default DogDetails;
