import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Aux from "../../hoc/Auxiliary";

class CreateForm extends Component {
  render() {
    const { classes, auth, handleChange, handleSubmit } = this.props;
    const {
      type,
      name,
      email,
      enrollNo,
      phoneNo,
      address,
      dept,
      password,
      rePassword
    } = auth;
    return (
      <ValidatorForm
        ref="form"
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          className={classes.TextFields}
          label="Name"
          onChange={handleChange}
          name="name"
          value={name}
          validators={["required", "isNameLongEnough"]}
          errorMessages={[
            "This field is required",
            "Name must be longer than 2 characters"
          ]}
        />
        <br />
        
        {/* render conflicting fields */}
        {type === "students" ? (
          <Aux>
            <TextValidator
              className={classes.TextFields}
              label="Enrollment Number"
              onChange={handleChange}
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
              label="Department"
              onChange={handleChange}
              name="dept"
              value={dept}
              validators={["required"]}
              errorMessages={[
                "This field is required"
              ]}
            />
            <br />
          </Aux>
        ) : (
          <Aux>
            <TextValidator
              className={classes.TextFields}
              label="Address"
              onChange={handleChange}
              name="address"
              value={address}
              validators={["required", "isAddressLongEnough"]}
              errorMessages={[
                "This field is required",
                "Address must be longer than 10 characters"
              ]}
            />
            <br />

            <TextValidator
              className={classes.TextFields}
              label="Phone Number"
              onChange={handleChange}
              name="phoneNo"
              value={phoneNo}
              validators={["required", "isNumber","isPhoneLengthOk"]}
              errorMessages={[
                "This field is required",
                "Phone number must contain only digits",
                "Phone number must contain 11 digits"
              ]}
            />
            <br />
          </Aux>
        )}

        <TextValidator
          className={classes.TextFields}
          label="Email"
          onChange={handleChange}
          name="email"
          value={email}
          validators={["required", "isEmail"]}
          errorMessages={["This field is required", "Invalid Email"]}
        />
        <br />
        <TextValidator
          className={classes.TextFields}
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          validators={["required", "isPasswordLongEnough"]}
          errorMessages={[
            "This field is required",
            "Password must be longer than 6 characters"
          ]}
        />
        <br />
        <TextValidator
          className={classes.TextFields}
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="rePassword"
          value={rePassword}
          validators={["required", "doPasswordsMatch"]}
          errorMessages={[
            "This field is required",
            "Passwords doesn't match"
          ]}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          className="auth-button"
        >
          Sign Up
        </Button>
      </ValidatorForm>
    );
  }
}

export default CreateForm;
