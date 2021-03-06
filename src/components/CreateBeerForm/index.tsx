import React, { FormEvent, ChangeEvent } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";

import "./CreateBeerForm.scss";

import { useStore } from "effector-react";
import { validForm } from "../../stores/beerForms/beerFormsStores";
import { setField } from "../../stores/beerForms/beerFormsEvents";

interface IProps {
  notify: Function;
}

const CreateBeerForm = ({ notify }: IProps) => {
  const isValidForm = useStore(validForm);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setField(event.target);
  };

  const onSelectChange = (event: ChangeEvent<any>) => {
    setField(event.target);
  };

  const onCheckboxChange = (event: ChangeEvent<any>) => {
    const formEvent = {
      name: event.target.name,
      value: event.target.checked,
    };

    setField(formEvent);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    notify();
  };

  return (
    <div className="create-beer-form">
      <h1 className="create-beer-form__title">Beer Form</h1>
      <form
        className="create-beer-form__form"
        onSubmit={onSubmit}
        data-testid="form"
      >
        <div className="create-beer-form__input-container">
          <TextField
            label="Beer name"
            id="beerName"
            name="beerName"
            variant="outlined"
            onChange={onInputChange}
          />
        </div>
        <div className="create-beer-form__input-container">
          <FormControl variant="outlined">
            <InputLabel id="beerTypeLabel">Beer type</InputLabel>
            <Select
              labelId="beerTypeLabel"
              id="beerType"
              label="Beer type"
              onChange={onSelectChange}
              value=""
              inputProps={{
                name: "beerType",
                id: "beerType",
              }}
            >
              <MenuItem data-testid="beer-type-option" value="ale">
                Ale
              </MenuItem>
              <MenuItem data-testid="beer-type-option" value="lager">
                Lager
              </MenuItem>
              <MenuItem data-testid="beer-type-option" value="malt">
                Malt
              </MenuItem>
              <MenuItem data-testid="beer-type-option" value="stout">
                Stout
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="create-beer-form__input-container">
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Has corn"
            labelPlacement="end"
            name="hasCorn"
            id="hasCorn"
            onChange={onCheckboxChange}
          />
        </div>
        <div className="create-beer-form__input-container">
          <TextField
            id="ingredients"
            label="Ingredients"
            multiline
            rows={3}
            variant="outlined"
            name="ingredients"
            onChange={onInputChange}
          />
        </div>
        <Button
          data-testid="form-submit-button"
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!isValidForm}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateBeerForm;
