import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";
import { setSignedIn } from "./store/actions/authActions";

import Navbar from "./components/Navbar/Navbar";
import getRoutes from "./routes";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("crs"));
    if (user) {
      this.props.setSignedIn(user);
    }
  };

  render() {
    let routes = getRoutes(this.props.status);
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div style={{ marginTop: 70 }}>{routes}</div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.auth.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignedIn: user => dispatch(setSignedIn(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
