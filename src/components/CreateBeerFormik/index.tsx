import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import { BeerForm } from "../../shared/types";
import { submitForm } from "../../stores/beerForms/beerFormsEvents";

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

import "./CreateBeerFormik.scss";

interface IProps {
  notify: Function;
}

const validationSchema = yup.object().shape({
  beerName: yup.string().required(),
  beerType: yup.string().required(),
  ingredients: yup.string().required(),
});

const defaultValues = {
  beerName: "",
  beerType: "",
  hasCorn: false,
  ingredients: "",
};

const CreateBeerFormik = ({ notify }: IProps) => {
  const handleSubmit = (values: BeerForm, { resetForm }: any) => {
    submitForm(values);
    notify();
    resetForm();
  };

  return (
    <div className="create-beer-formik">
      <h1 className="create-beer-formik__title">Beer Formik</h1>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          isValid,
          dirty,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="create-beer-formik__input-container">
                <TextField
                  label="Beer name"
                  id="beerName"
                  name="beerName"
                  variant="outlined"
                  value={values.beerName}
                  onChange={handleChange}
                />
              </div>
              <div className="create-beer-formik__input-container">
                <FormControl variant="outlined">
                  <InputLabel id="beerTypeLabel">Beer type</InputLabel>
                  <Select
                    labelId="beerTypeLabel"
                    id="beerType"
                    label="Beer type"
                    value={values.beerType}
                    onChange={handleChange}
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
              <div className="create-beer-formik__input-container">
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Has corn"
                  labelPlacement="end"
                  name="hasCorn"
                  id="hasCorn"
                  checked={values.hasCorn}
                  onChange={() => setFieldValue("hasCorn", !values.hasCorn)}
                />
              </div>
              <div className="create-beer-formik__input-container">
                <TextField
                  id="ingredients"
                  label="Ingredients"
                  multiline
                  rows={3}
                  variant="outlined"
                  name="ingredients"
                  value={values.ingredients}
                  onChange={handleChange}
                />
              </div>
              <Button
                disabled={!(isValid && dirty)}
                data-testid="form-submit-button"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBeerFormik;
