import React from 'react';
import _ from 'lodash';

import { List, Avatar, Tag } from 'antd';

const DogItem = ({ dog }) => {
  return (
    <List.Item style={{ padding: '0.5rem 1rem' }}>
      <List.Item.Meta
        avatar={<Avatar src={dog.image} />}
        title={_.upperFirst(dog.breed)}
      />
      <Tag color='default'>{dog.scolded}</Tag>
    </List.Item>
  );
};

export default DogItem;
