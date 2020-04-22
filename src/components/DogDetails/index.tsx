import React from "react";
import { useStore } from "effector-react";
import _ from "lodash";

import { selectedDog } from "../../effector/store";
import { scoldDog } from "../../effector/event";

import "./DogDetails.scss";
import { notification, Card, Avatar, Typography } from "antd";

const { Title } = Typography;

const DogDetails = () => {
  const dog = useStore(selectedDog);

  const bark = () => {
    notification.open({
      message: "Woof Woof!",
    });
  };

  const avatarSize = 150;
  const titleSize = 4;

  return (
    <div className="dog-details">
      <Card
        style={{ width: 300 }}
        cover={<Avatar size={avatarSize} src={dog.image} />}
        actions={[
          <p className="scold-action" onClick={() => scoldDog()}>
            Scold!
          </p>,
          <p className="bark-action" onClick={bark}>
            Bark!
          </p>,
        ]}
      >
        <Title level={titleSize}>{_.upperFirst(dog.breed)}</Title>
      </Card>
    </div>
  );
};

export default DogDetails;
