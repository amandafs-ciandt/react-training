import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';

import './CreateBeerForm.scss';

interface IProps {
  notify: Function;
}

type FormData = {
  beerName: string;
  beerType: string;
  hasCorn: boolean;
  ingredients: string;
};

const defaultValues = {
  beerName: '',
  beerType: '',
  hasCorn: false,
  ingredients: '',
};

const CreateBeerForm = ({ notify }: IProps) => {
  const [form, setForm] = useState<FormData>(defaultValues);
  const [validForm, setValidForm] = useState(false);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSelectChange = (event: ChangeEvent<any>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onCheckboxChange = (event: ChangeEvent<any>) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify();
  };

  useEffect(() => {
    setValidForm(
      form.beerName.length > 0 &&
        form.beerType.length > 0 &&
        form.ingredients.length > 0
    );
  }, [form]);

  return (
    <div className='create-beer-form'>
      <h1 className='create-beer-form__title'>Beer Form</h1>
      <form
        className='create-beer-form__form'
        onSubmit={onSubmit}
        data-testid='form'>
        <div className='create-beer-form__input-container'>
          <TextField
            label='Beer name'
            id='beerName'
            name='beerName'
            variant='outlined'
            onChange={onInputChange}
            value={form.beerName}
          />
        </div>
        <div className='create-beer-form__input-container'>
          <FormControl variant='outlined'>
            <InputLabel id='beerTypeLabel'>Beer type</InputLabel>
            <Select
              labelId='beerTypeLabel'
              id='beerType'
              label='Beer type'
              onChange={onSelectChange}
              value={form.beerType}
              inputProps={{
                name: 'beerType',
                id: 'beerType',
              }}>
              <MenuItem data-testid='beer-type-option' value='ale'>
                Ale
              </MenuItem>
              <MenuItem data-testid='beer-type-option' value='lager'>
                Lager
              </MenuItem>
              <MenuItem data-testid='beer-type-option' value='malt'>
                Malt
              </MenuItem>
              <MenuItem data-testid='beer-type-option' value='stout'>
                Stout
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='create-beer-form__input-container'>
          <FormControlLabel
            control={<Checkbox color='primary' />}
            label='Has corn'
            labelPlacement='end'
            name='hasCorn'
            id='hasCorn'
            onChange={onCheckboxChange}
            checked={form.hasCorn}
          />
        </div>
        <div className='create-beer-form__input-container'>
          <TextField
            id='ingredients'
            label='Ingredients'
            multiline
            rows={3}
            variant='outlined'
            name='ingredients'
            onChange={onInputChange}
            value={form.ingredients}
          />
        </div>
        <Button
          data-testid='form-submit-button'
          type='submit'
          variant='contained'
          color='secondary'
          disabled={!validForm}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateBeerForm;
