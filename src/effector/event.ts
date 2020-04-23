import { createEvent } from 'effector';
import { Dog, BeerForm } from '../shared/types';

export const setLoaded = createEvent<Boolean>('set loaded list');

export const loadList = createEvent<Dog[]>('load dogs list');
export const updateList = createEvent<Dog>('update dogs list');

export const selectDog = createEvent<Dog>('select dog');
export const scoldDog = createEvent<void>('scold dog');

export const toggleFilter = createEvent<string>('toggle filter');

export const submitForm = createEvent<BeerForm>('submit form');
