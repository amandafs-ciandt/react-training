import React from 'react';
import { submitForm } from '../effector/event';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Input, Checkbox, Button, Select } from 'antd';
import './CreateBeerFormikForm.scss';

const { Option } = Select;

const CreateBeerFormikForm = ({ notify }) => {
  const beerSchema = yup.object().shape({
    beerName: yup.string().required('Required'),
    beerType: yup.string().required('Required'),
    ingredients: yup.string().required('Required'),
  });

  const beerForm = useFormik({
    initialValues: {
      beerName: '',
      beerType: '',
      hasCorn: false,
      ingredients: '',
    },
    validationSchema: beerSchema,
    onSubmit: (values, { resetForm }) => {
      submitForm(values);

      notify('Form successfully submitted!');
      resetForm();
    },
  });

  return (
    <form onSubmit={beerForm.handleSubmit} className='beer-form'>
      <div className='beer-form__input'>
        <label htmlFor='beerName' className='beer-form__label required-field'>
          Beer name:
        </label>
        <Input
          name='beerName'
          value={beerForm.values.beerName}
          onChange={beerForm.handleChange}
        />
      </div>

      <div className='beer-form__input'>
        <label htmlFor='beerType' className='beer-form__label required-field'>
          Beer type:
        </label>
        <Select
          placeholder='Select a beer type'
          value={beerForm.values.beerType}
          onChange={(value) => beerForm.setFieldValue('beerType', value)}>
          <Option value='ale'>Ale</Option>
          <Option value='lager'>Lager</Option>
          <Option value='malt'>Malt</Option>
          <Option value='stout'>Stout</Option>
        </Select>
      </div>

      <div className='beer-form__input checkbox-input'>
        <label></label>
        <Checkbox
          checked={beerForm.values.hasCorn}
          onChange={() =>
            beerForm.setFieldValue('hasCorn', !beerForm.values.hasCorn)
          }>
          Has corn
        </Checkbox>
      </div>

      <div className='beer-form__input'>
        <label
          htmlFor='ingredients'
          className='beer-form__label required-field'>
          Ingredients:
        </label>
        <Input.TextArea
          name='ingredients'
          value={beerForm.values.ingredients}
          onChange={beerForm.handleChange}
        />
      </div>

      <Button
        type='primary'
        htmlType='submit'
        disabled={!(beerForm.isValid && beerForm.dirty)}>
        Submit
      </Button>
    </form>
  );
};

export default CreateBeerFormikForm;
