import React from "react";
import _ from "lodash";

import { RadioChangeEvent } from "antd/lib/radio";
import { Badge, Radio } from "antd";

import { useList, useStore } from "effector-react";
import { dogBreedFilter, dogs } from "../../effector/store";
import { toggleFilter } from "../../effector/event";
import { Dog } from "../../effector/types";

const DogFilter = () => {
  const dogList = useStore(dogs);

  const filterOptions = useList(dogBreedFilter, ({ letter }, index) =>
    letter !== "" ? (
      <Radio key={index} value={letter}>
        {_.upperFirst(letter)}
        <Badge
          showZero
          count={
            dogList.filter((dog: Dog) => dog.breed.startsWith(letter)).length
          }
          style={{ marginLeft: "0.5rem", backgroundColor: "#2db7f5" }}
        />
      </Radio>
    ) : (
      <Radio key={index} value={letter}>
        All
      </Radio>
    )
  );

  const onChange = (e: RadioChangeEvent) => {
    e.preventDefault();
    toggleFilter(e.target.value);
  };

  return (
    <div style={{ padding: "0 0.5rem" }}>
      <Radio.Group onChange={onChange} size="middle">
        {filterOptions}
      </Radio.Group>
    </div>
  );
};

export default DogFilter;
