import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/authActions";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <div />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.signout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
