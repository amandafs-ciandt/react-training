import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import axios, { AxiosResponse } from 'axios';

import { loadList, setLoaded, selectDog } from './effector/event';
import { loaded } from './effector/store';
import { Dog } from './effector/types';

import { Layout, Row, Col, Divider, Spin, message } from 'antd';
import './App.scss';

import DogList from './components/DogList';
import DogDetails from './components/DogDetails';
import DogFilter from './components/DogFilter';
import CreateBeerForm from './components/CreateBeerForm';
import CreateBeerFormikForm from './components/CreateBeerFormikForm';

const App = () => {
  const { Content } = Layout;

  const isLoaded = useStore(loaded);

  useEffect(() => {
    if (!isLoaded) {
      getDogList();
    }
  }, [isLoaded]);

  const onNotify = (text: string, success = true) => {
    success ? message.success(text) : message.error(text);
  };

  return (
    <Layout className='app'>
      <Content>
        <Row justify='center' align='middle'>
          <Col span={8}>
            <DogDetails />
          </Col>
          <Col span={16}>
            <DogFilter />
            <Spin spinning={!isLoaded}>
              <DogList />
            </Spin>
          </Col>
        </Row>
        <Divider />
        <Row justify='center' align='middle'>
          <Col span={12}>
            <CreateBeerForm notify={onNotify} />
          </Col>
          <Col span={12}>
            <CreateBeerFormikForm notify={onNotify} />
          </Col>
        </Row>
      </Content>
    </Layout>
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
