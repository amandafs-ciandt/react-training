import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

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

import './CreateBeerFormik.scss';

interface IProps {
  notify: Function;
}

const beerSchema = yup.object().shape({
  beerName: yup.string().required(),
  beerType: yup.string().required(),
  hasCorn: yup.boolean(),
  ingredients: yup.string().required(),
});

const defaultValues = {
  beerName: '',
  beerType: '',
  hasCorn: false,
  ingredients: '',
};

const CreateBeerFormik = ({ notify }: IProps) => {
  const beerForm = useFormik({
    initialValues: defaultValues,
    validationSchema: beerSchema,
    onSubmit: () => {
      notify();
    },
  });

  return (
    <div className='create-beer-formik'>
      <h1 className='create-beer-formik__title'>Beer Formik</h1>
      <form
        onSubmit={beerForm.handleSubmit}
        className='create-beer-formik__form'>
        <div>
          <div className='create-beer-formik__input-container'>
            <TextField
              label='Beer name'
              id='beerName'
              name='beerName'
              variant='outlined'
              value={beerForm.values.beerName}
              onChange={beerForm.handleChange}
            />
          </div>
          <div className='create-beer-formik__input-container'>
            <FormControl variant='outlined'>
              <InputLabel id='beerTypeLabel'>Beer type</InputLabel>
              <Select
                labelId='beerTypeLabel'
                id='beerType'
                label='Beer type'
                value={beerForm.values.beerType}
                onChange={beerForm.handleChange}
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
          <div className='create-beer-formik__input-container'>
            <FormControlLabel
              control={<Checkbox color='primary' />}
              label='Has corn'
              labelPlacement='end'
              name='hasCorn'
              id='hasCorn'
              checked={beerForm.values.hasCorn}
              onChange={() =>
                beerForm.setFieldValue('hasCorn', !beerForm.values.hasCorn)
              }
            />
          </div>
          <div className='create-beer-formik__input-container'>
            <TextField
              id='ingredients'
              label='Ingredients'
              multiline
              rows={3}
              variant='outlined'
              name='ingredients'
              value={beerForm.values.ingredients}
              onChange={beerForm.handleChange}
            />
          </div>
          <Button
            disabled={!(beerForm.isValid && beerForm.dirty)}
            data-testid='form-submit-button'
            type='submit'
            variant='contained'
            color='secondary'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBeerFormik;
