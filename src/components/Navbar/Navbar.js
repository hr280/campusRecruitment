import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import Aux from "../../hoc/Auxiliary";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    let navbarContent = "";
    const { status } = this.props;

    if (status !== "") {
      // to render different tabs for diff type of users
      let tabs = [];
      if (status === 1) tabs = ["students", "companies", "vacancies", "logout"];
      else if (status === 2) tabs = ["profile", "companies", "vacancies", "logout"];
      else if (status === 3) tabs = ["profile", "students", "logout"];
      else if (status === 4) tabs = ["logout"];

      navbarContent = (
        <Aux>
          
            <h1 className="heading"> Recruitment Portal</h1>
          {/* <p className="navbar-brand  nav-item-color nav-bar-heading">
            <h1 style={{textAlign: 'center'}}></h1>
          </p> */}

          {/* render hamburger only if authenticated */}
          {tabs.length > 0 ? (
            <button
              className="navbar-toggler toggle-button"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div className="hamburger" />
              <div className="hamburger" />
              <div className="hamburger" />
            </button>
          ) : ""}

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            
              {/* rendering tabs */}
              {tabs.map(tab => (
                <li className="nav-item" key={tab}>
                  <NavLink
                    className="nav-link nav-item-color"
                    to={`/${tab}`}
                    exact
                  >
                    {tab[0].toUpperCase() + tab.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </Aux>
      );
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-bg custom-nav">
        {navbarContent}
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.auth.status
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
