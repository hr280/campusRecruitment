import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/authActions";

import { ValidatorForm } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Card from "../../../hoc/Card";
import SignUpFields from "../../../components/Auth/SignUpForm";
import Spinner from "../../../components/Spinner/Spinner";

import validations from "../../../validation/Validation";

import "./SignUp.css";

const styles = theme => {
  return {
    TextFields: {
      marginBottom: "20px",
      width: "95%"
    },
    button: {
      margin: theme.spacing.unit,
      marginBottom: "10px",
      backgroundColor: "#1f4f16",
      color: "white"
    },
    authMessage: {
      textDecoration: "underline",
      cursor: "pointer"
    }
  };
};

class SignUp extends Component {
  componentDidMount() {
    validations();
    
    ValidatorForm.addValidationRule("doPasswordsMatch", value => {
      if (value !== this.props.auth.password) return false;
      return true;
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.props.onInputChange({ key: name, value });
  };

  handleSubmit = () => {
    const { onSignUp, history} = this.props;
    onSignUp(history);
  };

  render() {
    const { classes, auth } = this.props;
    const { errorSignup, loading, type } = auth;
    const formFields = (
      <SignUpFields
        auth={auth}
        classes={classes}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );

    return (
      <div style={{ marginTop: 110 }}>
        <h1 className="main-heading-signup">Campus Recruitment System</h1>
        <div className="signup-card-container">
          {!loading ? (
            <Card>
              <h2 className="singin-heading">Sign up</h2>
              <div className="type-para">
                <span className="type-text">Create Account As{"    "}</span>
                <FormControl className={classes.formControl}>
                  <Select
                    value={type}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "type",
                      id: "type-simple"
                    }}
                  >
                    <MenuItem value="students">Student</MenuItem>
                    <MenuItem value="companies">Company</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <p className="Error">{errorSignup ? errorSignup : null}</p>
              
              {formFields}
              
              <p>
                Already Have an Account?{" "}
                <Link to="/signin" className="auth-type">
                  Sign In
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
    onSignUp: history => dispatch(actions.signup(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUp));
