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
      operatingSince,
      phoneNo,
      facebook,
      website,
      introduction,
      address
    } = info;
    
    return (
      <div style={{ marginTop: 50 }}>
        <div className="card-container">
          <h2 className="singin-heading">Edit Company Information</h2>
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
              label="Facebook Page"
              onChange={this.handleChange}
              name="facebook"
              value={facebook}
              validators={["isURL"]}
              errorMessages={["Invalid URL"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Website"
              onChange={this.handleChange}
              name="website"
              value={website}
              validators={["isURL"]}
              errorMessages={["Invalid URL"]}
            />
            <br />
            <TextField
              id="date"
              label="Operating Since"
              type="date"
              onChange={this.handleChange}
              name="operatingSince"
              value={operatingSince}
              className={classes.TextFields}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Introduce Your Company"
              onChange={this.handleChange}
              name="introduction"
              value={introduction}
              validators={["lessThan5Chars"]}
              errorMessages={["Introduction must be longer than 4 Characters"]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Address"
              onChange={this.handleChange}
              name="address"
              value={address}
              validators={["required", "isAddressLongEnough"]}
              errorMessages={[
                "This field is required",
                "Address must be longer than 9 characters"
              ]}
            />
            <br />
            <TextValidator
              className={classes.TextFields}
              label="Contact No"
              onChange={this.handleChange}
              name="phoneNo"
              value={phoneNo}
              validators={["required", "isNumber", "isPhoneLengthOk"]}
              errorMessages={[
                "This field is required",
                "Contact Number must contain only digits",
                "Contact Number must contain 11 digits"
              ]}
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
