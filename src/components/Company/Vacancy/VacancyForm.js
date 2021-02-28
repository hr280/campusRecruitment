import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

import validations from "../../../validation/Validation";

const styles = theme => {
  return {
    TextFields: {
      marginBottom: "20px",
      width: "95%"
    }
  };
};

class VacancyForm extends Component {
  componentDidMount() {
    validations();
  }

  handleChange = event => {
    this.props.inputChangedHandler(event, "vac");
  };

  handleSubmit = () => {
    this.props.onSubmit();
  };

  render() {
    const { vacancy, classes } = this.props;
    const { skills, gpa, salary, description, lastDate } = vacancy;

    return (
      <div style={{ marginTop: 50 }}>
        <div className="card-container">
          <h2 className="singin-heading">Edit Vacancy</h2>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className={classes.TextFields}
              label="Skills"
              onChange={this.handleChange}
              name="skills"
              value={skills}
              validators={["required"]}
              errorMessages={["This field is required"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Minimum CGPA"
              onChange={this.handleChange}
              name="gpa"
              value={gpa}
              validators={["required", "isFloat", "inGpaRange"]}
              errorMessages={[
                "This field is required",
                "CGPA must be a number",
                "CGPA must be between 1 and 4"
              ]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Minimum Salary"
              onChange={this.handleChange}
              name="salary"
              value={salary}
              validators={["required", "isFloat", "moreThanMinSal"]}
              errorMessages={[
                "This field is required",
                "Salary must be a number",
                "Salary must be between more than 15,000"
              ]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Description"
              onChange={this.handleChange}
              name="description"
              value={description}
              validators={["required", "lessThan10Chars"]}
              errorMessages={[
                "This field is required",
                "Description must contain at least 10 characters"
              ]}
            />
            <br />
            <TextField
              id="date"
              label="Last Date to Apply"
              type="date"
              required
              onChange={this.handleChange}
              name="lastDate"
              value={lastDate}
              className={classes.TextFields}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <Button type="submit" variant="contained" className="auth-button">
              Save
            </Button>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VacancyForm);