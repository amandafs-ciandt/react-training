import React, { useState } from "react";
import { submitForm } from "../../effector/event";
import {
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
} from "@material-ui/core";

import "./CreateBeerForm.scss";

const initialValues = {
  beerName: "",
  beerType: "",
  hasCorn: false,
  ingredients: "",
};

const CreateBeerForm = ({ notify }) => {
  // const [form] = Form.useForm();
  const [validForm, setValidForm] = useState(false);

  /* const validateForm = (): void => {
    setValidForm(
      form.getFieldValue("beerName").length > 0 &&
        form.getFieldValue("beerType").length > 0 &&
        form.getFieldValue("ingredients").length > 0
    );
  }; */

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    /* const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    }); */
  };

  const handleSubmit = (values: any): void => {
    submitForm(values);

    notify("Form successfully submitted!");
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#595959" }}>Beer Form</h1>
      <form className="create-beer-form" onSubmit={handleSubmit}>
        <TextField
          className="margin-bottom-one"
          label="Beer name"
          id="beerName"
          name="beerName"
          variant="outlined"
          required
        />
        <FormControl variant="outlined" className="margin-bottom-one">
          <InputLabel htmlFor="beerType">Beer type</InputLabel>
          <Select
            native
            inputProps={{
              name: "beerType",
              id: "beerType",
            }}
          >
            <MenuItem value="ale">Ale</MenuItem>
            <MenuItem value="lager">Lager</MenuItem>
            <MenuItem value="malt">Malt</MenuItem>
            <MenuItem value="stout">Stout</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          value="end"
          control={<Checkbox color="primary" />}
          label="Has corn"
          labelPlacement="end"
          className="margin-bottom-one"
        />
        <TextField
          id="ingredients"
          name="ingredients"
          label="Ingredients"
          multiline
          rowsMax={4}
          onChange={handleChange}
          className="margin-bottom-one"
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateBeerForm;
