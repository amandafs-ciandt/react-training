import React from 'react';
import _ from 'lodash';

import { List, Avatar, Badge } from 'antd';

const DogItem = ({ dog }) => {
  return (
    <List.Item style={{ padding: '0.5rem 1rem' }}>
      <List.Item.Meta
        avatar={<Avatar src={dog.image} />}
        title={_.upperFirst(dog.breed)}
      />
      <Badge count={dog.scolded} showZero />
    </List.Item>
  );
};

export default DogItem;
