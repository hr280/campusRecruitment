import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/authActions";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Card from "../../../hoc/Card";
import Spinner from "./../../../components/Spinner/Spinner";

import validations from "../../../validation/Validation";

import "./SignIn.css";

const styles = theme => {
  return {
    TextFields: {
      marginBottom: "20px",
      width: "95%"
    },
    authMessage: {
      textDecoration: "underline",
      cursor: "pointer"
    }
  };
};

class SignIn extends Component {
  componentDidMount() {
    validations();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.props.onInputChange({ key: name, value });
  };

  handleSubmit = () => {
    const { onSignIn, history } = this.props;
    onSignIn(history);
  };

  render() {
    const { auth, classes } = this.props;
    const { email, passwordSignin, loading, errorSignin } = auth;
    return (
      <div style={{ marginTop: 50 }}>
        <h1 className="main-heading">Campus Recruitment System</h1>
        <div className="card-container">
          {!loading ? (
            <Card>
              <h2 className="singin-heading">Sign in</h2>
              <p className="Error">{errorSignin ? errorSignin : null}</p>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
              >
                <TextValidator
                  className={classes.TextFields}
                  label="Email"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  name="passwordSignin"
                  value={passwordSignin}
                  validators={["required", "isPasswordLongEnough"]}
                  errorMessages={[
                    "This field is required",
                    "Password must be longer than 6 characters"
                  ]}
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  className="auth-button"
                >
                  Sign In
                </Button>
              </ValidatorForm>
              
              <p>
                Don't Have an Account?{" "}
                <Link to="/signup" className="auth-type">
                  Sign Up
                </Link>
              </p>
            </Card>
          ) : (
            <div className="auth-spinner">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: payload => dispatch(actions.changeInput(payload)),
    onSignIn: history => dispatch(actions.signin(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
