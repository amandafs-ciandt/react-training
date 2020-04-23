import React from 'react';
import { useStore } from 'effector-react';
import axios, { AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

import { loadList, setLoaded, selectDog } from './effector/event';
import { loaded } from './effector/store';

import CreateBeerForm from './components/CreateBeerForm';
import CreateBeerFormik from './components/CreateBeerFormik';
import DogDetails from './components/DogDetails';
import DogList from './components/DogList';
import DogFilter from './components/DogFilter';

import { Dog } from './shared/types';

import { CircularProgress, Divider } from '@material-ui/core';
import './App.scss';

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  const isLoaded = useStore(loaded);

  React.useEffect(() => {
    if (!isLoaded) {
      getDogList();
    }
  }, [isLoaded]);

  const renderDogInfo = () => {
    if (isLoaded) {
      return (
        <div className='app__dogs-container'>
          <DogDetails />
          <div>
            <DogFilter />
            <DogList />
          </div>
        </div>
      );
    } else {
      return (
        <div className='app__loading'>
          <CircularProgress />
        </div>
      );
    }
  };

  const onFormNotify = () => {
    enqueueSnackbar('Form successfully submitted!', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  };

  return (
    <div className='app'>
      {renderDogInfo()}
      <Divider />
      <div className='app__forms-container'>
        <CreateBeerForm notify={onFormNotify} />
        <CreateBeerFormik notify={onFormNotify} />
      </div>
    </div>
  );
};

const getDogList = async () => {
  const url: string = 'https://dog.ceo/api';
  const dogsList: Dog[] = [];
  const promises: Promise<AxiosResponse>[] = [];

  const listResponse = await axios.get(`${url}/breeds/list/all`);

  Object.keys(listResponse.data.message).forEach((dogBreed: string) => {
    dogsList.push({
      breed: dogBreed,
      image: '',
      scolded: 0,
    });

    promises.push(axios.get(`${url}/breed/${dogBreed}/images/random`));
  });

  axios.all(promises).then((results) => {
    results.forEach((response, index) => {
      dogsList[index].image = response.data.message;
    });

    loadList(dogsList);
    setLoaded(true);
    selectDog(dogsList[0]);
  });
};

export default App;
