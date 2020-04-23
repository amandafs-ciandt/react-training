import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import notistack from 'notistack';
import * as effector from 'effector-react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as events from './effector/event';

import App from './App';
import { act } from '@testing-library/react';

jest.mock('./effector/event');

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));

const closeSnackbar = jest.fn();
const enqueueSnackbar = jest.fn();

jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => {
  return { enqueueSnackbar, closeSnackbar };
});

const useStoreSpy = jest.spyOn(effector, 'useStore');

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<App />);
};

const setUpMountedRendering = (): ReactWrapper => {
  return mount(<App />);
};

const mockDogList = {
  message: {
    beagle: [],
    pug: [],
    stbernard: [],
  },
  status: 'success',
};

const mockDogImage = {
  message: 'https://images.dog.ceo/breeds/hound-english/n02089973_2484.jpg',
  status: 'success',
};

const dogsList = [
  {
    breed: 'beagle',
    image: 'https://images.dog.ceo/breeds/hound-english/n02089973_2484.jpg',
    scolded: 0,
  },
  {
    breed: 'pug',
    image: 'https://images.dog.ceo/breeds/hound-english/n02089973_2484.jpg',
    scolded: 0,
  },
  {
    breed: 'stbernard',
    image: 'https://images.dog.ceo/breeds/hound-english/n02089973_2484.jpg',
    scolded: 0,
  },
];

describe('App', () => {
  let appComponent: ShallowWrapper | ReactWrapper;

  it('should render correctly', () => {
    appComponent = setUpShallowRendering();

    expect(appComponent).toMatchSnapshot();
  });

  it('should show toast notification when notify from CreateBeerForm is called', () => {
    appComponent = setUpShallowRendering();

    (appComponent.find('CreateBeerForm').prop('notify') as any)();

    expect(enqueueSnackbar).toHaveBeenCalled();
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Form successfully submitted!',
      {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }
    );
  });

  it('should show toast notification when notify from CreateBeerFormik is called', () => {
    appComponent = setUpShallowRendering();

    (appComponent.find('CreateBeerFormik').prop('notify') as any)();

    expect(enqueueSnackbar).toHaveBeenCalled();
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Form successfully submitted!',
      {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }
    );
  });

  it('should render loading when dog list is still being fetched', () => {
    useStoreSpy.mockReturnValue(false);
    appComponent = setUpShallowRendering();

    const loadingExists = appComponent.find('.app__loading').exists();
    const dogsContainerExists = appComponent
      .find('.app__dogs-container')
      .exists();

    expect(loadingExists).toBeTruthy();
    expect(dogsContainerExists).toBeFalsy();
  });

  it('should render dog components after dog list is fetched', () => {
    useStoreSpy.mockReturnValue(true);
    appComponent = setUpShallowRendering();

    const loadingExists = appComponent.find('.app__loading').exists();
    const dogsContainerExists = appComponent
      .find('.app__dogs-container')
      .exists();

    expect(dogsContainerExists).toBeTruthy();
    expect(loadingExists).toBeFalsy();
  });

  it('should fetch dog api data', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('https://dog.ceo/api/breeds/list/all').reply(200, mockDogList);

    mock
      .onGet('https://dog.ceo/api/breed/beagle/images/random')
      .reply(200, mockDogImage);
    mock
      .onGet('https://dog.ceo/api/breed/pug/images/random')
      .reply(200, mockDogImage);
    mock
      .onGet('https://dog.ceo/api/breed/stbernard/images/random')
      .reply(200, mockDogImage);

    useStoreSpy.mockReturnValue(false);
    appComponent = setUpMountedRendering();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const loadListMock = jest
      .spyOn(events, 'loadList')
      .mockImplementation((dogs) => dogs);

    const selectDogMock = jest
      .spyOn(events, 'selectDog')
      .mockImplementation((dog) => dog);

    expect(loadListMock).toHaveBeenCalledWith(dogsList);
    expect(selectDogMock).toHaveBeenCalledWith(dogsList[0]);
  });
});
