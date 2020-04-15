import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Button, Select, Form } from 'antd';
import { submitForm } from '../effector/event';
import { Store } from 'antd/lib/form/interface';

const { Option } = Select;

const layout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

const tailLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

const initialValues = {
  beerName: '',
  beerType: '',
  hasCorn: false,
  ingredients: '',
};

const CreateBeerForm = ({ notify }) => {
  const [form] = Form.useForm();

  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    setValidForm(
      form.getFieldValue('beerName').length > 0 &&
        form.getFieldValue('beerType').length > 0 &&
        form.getFieldValue('ingredients').length > 0
    );
  }, [form]);

  const onSubmit = (values: any): void => {
    submitForm(values);

    notify('Form successfully submitted!');
    form.resetFields();
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={onSubmit}>
      <Form.Item
        {...layout}
        label='Beer name'
        name='beerName'
        rules={[{ required: true, message: 'Please input the beer name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        {...layout}
        name='beerType'
        label='Beer type'
        rules={[{ required: true, message: 'Please input the beer type!' }]}>
        <Select placeholder='Select a beer type'>
          <Option value='ale'>Ale</Option>
          <Option value='lager'>Lager</Option>
          <Option value='malt'>Malt</Option>
          <Option value='stout'>Stout</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout} name='hasCorn' valuePropName='checked'>
        <Checkbox>Has corn</Checkbox>
      </Form.Item>

      <Form.Item
        {...layout}
        name='ingredients'
        label='Ingredients'
        rules={[{ required: true, message: 'Please input the ingredients!' }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' disabled={!validForm}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBeerForm;
