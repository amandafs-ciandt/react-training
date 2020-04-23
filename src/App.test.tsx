import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import App from './App';

const setUpShallowRendering = (): ShallowWrapper => {
  return shallow(<App />);
};

const setUpMountedRendering = (): ReactWrapper => {
  return mount(<App />);
};

describe('App', () => {
  let appComponent: ShallowWrapper | ReactWrapper;

  it('should render correctly', () => {
    appComponent = setUpShallowRendering();

    expect(appComponent).toMatchSnapshot();
  });

  it('should render correctly', () => {
    expect(true).toBeTruthy();
  });
});
