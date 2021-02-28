import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import validations from "../../../validation/Validation";

const styles = theme => {
  return {
    TextFields: {
      marginBottom: "20px",
      width: "95%"
    }
  };
};
 
class PersonalInfoForm extends Component {
  componentDidMount() {
    validations();
  }

  handleChange = event => {
    this.props.inputChangedHandler(event, "info");
  };

  handleSubmit = () => {
    this.props.onSubmit();
  };

  render() {
    const { info, classes } = this.props;
    const {
      name,
      dob,
      enrollNo,
      skills,
      introduction,
      cgpa,
      address,
      phone,
      github,
      linkedin
    } = info;
    return (
      <div style={{ marginTop: 50 }}>
        <div className="card-container">
          <h2 className="singin-heading">Edit Personal Information</h2>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className={classes.TextFields}
              label="Name"
              onChange={this.handleChange}
              name="name"
              value={name}
              validators={["required", "isNameLongEnough"]}
              errorMessages={[
                "This field is required",
                "Name must be longer than 2 characters"
              ]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Enrollment Number"
              onChange={this.handleChange}
              name="enrollNo"
              value={enrollNo}
              validators={["required", "isNameLongEnough"]}
              errorMessages={[
                "This field is required",
                "Enrollment Number must be longer than 2 digits"
              ]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Skills"
              onChange={this.handleChange}
              name="skills"
              value={skills}
            />
            <br />
            <TextField
              id="date"
              label="Birthday"
              type="date"
              onChange={this.handleChange}
              name="dob"
              value={dob}
              className={classes.TextFields}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Introduce Yourself"
              onChange={this.handleChange}
              name="introduction"
              value={introduction}
              validators={["lessThan5Chars"]}
              errorMessages={["Introduction must be longer than 5 Characters"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Current CGPA"
              onChange={this.handleChange}
              name="cgpa"
              value={cgpa}
              validators={["isFloat","inGpaRange"]}
              errorMessages={["CGPA must be a number","CGPA must be between 1 and 4"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Address"
              onChange={this.handleChange}
              name="address"
              value={address}
              validators={["lessThan10Chars"]}
              errorMessages={["Address must be longer than 10 Characters"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Contact No"
              onChange={this.handleChange}
              name="phone"
              value={phone}
              validators={["isNumber","isPhoneLengthOk"]}
              errorMessages={["Contact Number must contain only digits","Contact Number must contain 11 digits"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Github Handle"
              onChange={this.handleChange}
              name="github"
              value={github}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="LinkedIn Handle"
              onChange={this.handleChange}
              name="linkedin"
              value={linkedin}
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

export default withStyles(styles)(PersonalInfoForm);