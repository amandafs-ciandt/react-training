import React from 'react';
import _ from 'lodash';

import { RadioChangeEvent } from 'antd/lib/radio';
import { Badge, Radio } from 'antd';
import './DogFilter.scss';

import { useList } from 'effector-react';
import { dogBreedFilter } from '../effector/store';
import { toggleFilter } from '../effector/event';

const DogFilter = () => {
  const filterOptions = useList(dogBreedFilter, ({ letter }, index) =>
    letter !== '' ? (
      <Radio.Button key={index} value={letter}>
        {_.upperFirst(letter)}
        <Badge showZero count={0} style={{ marginLeft: '0.5rem' }} />
      </Radio.Button>
    ) : (
      <Radio.Button key={index} value={letter}>
        Clear
      </Radio.Button>
    )
  );

  const onChange = (e: RadioChangeEvent) => {
    e.preventDefault();
    toggleFilter(e.target.value);
  };

  return (
    <div className='dog-filter'>
      <Radio.Group onChange={onChange} size='middle'>
        {filterOptions}
      </Radio.Group>
    </div>
  );
};

export default DogFilter;
