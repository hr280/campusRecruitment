import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// auth containers
import Signin from "./containers/Auth/SignIn/SignIn";
import Signup from "./containers/Auth/SignUp/SignUp";
import Logout from "./containers/Auth/Logout/Logout";
import Blocked from "./containers/Auth/Blocked/Blocked";

// student containers
import StudentProfile from "./containers/Student/Profile/Profile";
import Students from "./containers/Student/Students/Students";
// company containers
import CompanyProfile from "./containers/Company/Profile/Profile";
import Companies from "./containers/Company/Companies/Companies";

const getRoutes = status => {

  let routes = (
    <Switch>
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Redirect to="/signin" />
    </Switch>
  );

  // routes for admin
  if (status === 1) {
    routes = (
      <Switch>
        <Route path="/students" component={Students} />
        <Route path="/companies" component={Companies} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/students" />
      </Switch>
    );
  }

  // routes for students
  if (status === 2) {
    routes = (
      <Switch>
        <Route path="/profile" exact component={StudentProfile} />
        <Route path="/companies" component={Companies} />
        <Route path="/profile/:id" component={CompanyProfile} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

  // routes for companies
  else if (status === 3) {
    routes = (
      <Switch>
        <Route path="/profile" exact component={CompanyProfile} />
        <Route path="/students" component={Students} />
        <Route path="/logout" component={Logout} />
        <Route path="/profile/:id" component={StudentProfile} />
        <Redirect to="/profile" />
      </Switch>
    );
  }

    // routes for blocked users
    else if (status === 4) {
      routes = (
        <Switch>
          <Route path="/blocked" component={Blocked} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/blocked" />
        </Switch>
      );
    }

  return routes;
};

export default getRoutes;
