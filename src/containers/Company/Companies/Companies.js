import React, { Component } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import * as actions from "../../../store/actions/companiesActions";
import { manipulateAccount } from "../../../store/actions/authActions";

import PersonalInfo from "../../../components/Students/PersonalInfo/PersonalInfo";
import BlockIcon from "../../../components/Icon/BlockIcon";
import UnblockIcon from "../../../components/Icon/Unblock";
import Spinner from "./../../../components/Spinner/Spinner";

// helper functions
import { getDate } from "../../../common/timeHelperFunctions";
import navigationHandler from "../../../common/navigationHandler";

import "./Companies.css";

class Companies extends Component {
  componentDidMount() {
    const { auth, getCompanies } = this.props;
    getCompanies(auth.admin);
  }

  onBlock = uid => {
    this.props.blockAccount(uid);
  };

  onUnblock = uid => {
    this.props.unblockAccount(uid);
  };

  render() {
    const { auth, companies } = this.props;
    const { loading, admin } = auth;
    const compnayInfoArray = companies.companies.map(company => [
      { key: "Name", value: company.name },
      { key: "Operating Since", value: getDate(company.operatingSince) },
      { key: "Facebook", value: company.facebook },
      { key: "Website", value: company.website },
      { key: "Introduction", value: company.introduction },
      { key: "Address", value: company.address },
      { key: "Contact No", value: company.phoneNo },
      { key: "Email", value: company.email },
      {
        key: "Posted Vacancies",
        value: company.vacancies ? company.vacancies.length : "0"
      }
    ]);

    return !loading ? (
      <div className="lol">
        <h1 className="main-heading-companies">Registered Companies</h1>
        <div className="company-vacancies-container" style={{ width: "100%" }}>
          {compnayInfoArray.length > 0 ? (
            compnayInfoArray.map((companyInfo, index) => {
              const {id, disabled} = companies.companies[index];
              return (
                <div className="cmps-list-info-container" key={index}>
                  {/* don't navigate if owner, admin or visitor clicks on card */}
                  <Link
                    to={`/profile/${id}`}
                    style={{ textDecoration: "none" }}
                    onClick={e => navigationHandler(e, admin)}
                  >
                    {/* show block icon for admin only */}
                    {admin && disabled? <UnblockIcon onUnblock={this.onUnblock} id={id} /> : ""}
                    {admin && !disabled? <BlockIcon onBlock={this.onBlock} id={id} /> : ""}
                    <PersonalInfo info={companyInfo} />
                  </Link>
                </div>
              );
            })
          ) : (
            <h1 className="blocked-msg">No Companies to Show.</h1>
          )}
        </div>
      </div>
    ) : (
      <div className="profile-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    companies: state.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompanies: flag => dispatch(actions.getCompanies(flag)),
    blockAccount: uid => dispatch(manipulateAccount("companies", uid, true)),
    unblockAccount: uid => dispatch(manipulateAccount("companies", uid, false))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Companies);
