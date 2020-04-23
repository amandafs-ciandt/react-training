import React from 'react';
import { useStore } from 'effector-react';
import _ from 'lodash';

import { selectedDog } from '../../effector/store';
import { scoldDog } from '../../effector/event';

import { useSnackbar } from 'notistack';

import './DogDetails.scss';
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';

const DogDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dog = useStore(selectedDog);

  const bark = () => {
    enqueueSnackbar('Woof woof!', {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  };

  return (
    <div className='dog-details'>
      <Card className=''>
        <CardActionArea>
          <CardMedia
            component='img'
            alt={dog.breed}
            height='200'
            image={dog.image}
            title={dog.breed}
            data-testid='dog-details-image'
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='h2'
              data-testid='dog-details-breed'>
              {_.upperFirst(dog.breed)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='secondary'
            data-testid='dog-details-scold-button'
            onClick={() => scoldDog()}>
            Scold!
          </Button>
          <Button
            size='small'
            color='secondary'
            data-testid='dog-details-bark-button'
            onClick={bark}>
            Bark!
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default DogDetails;
