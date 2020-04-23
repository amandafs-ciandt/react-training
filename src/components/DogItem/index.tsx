import React from 'react';
import _ from 'lodash';

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@material-ui/core';

import { Dog } from '../../shared/types';

interface IProps {
  dog: Dog;
}

const DogItem = ({ dog }: IProps) => {
  return (
    <ListItem alignItems='center' button>
      <ListItemAvatar>
        <Avatar alt={dog.breed} src={dog.image} data-testid='dog-item-avatar' />
      </ListItemAvatar>
      <ListItemText
        primary={_.upperFirst(dog.breed)}
        data-testid='dog-item-breed'
      />
      <ListItemSecondaryAction>
        <Chip label={dog.scolded} data-testid='dog-item-scolded-value' />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DogItem;
