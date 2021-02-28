import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions/studentsActions";

import Button from "@material-ui/core/Button";

import PersonalInfo from "../../../components/Students/PersonalInfo/PersonalInfo";
import PersonalInfoForm from "../../../components/Students/PersonalInfo/PersonalInfoForm";

import EducationTable from "../../../components/Students/Education/EducationTable";
import EducationForm from "../../../components/Students/Education/EducationForm";

import ExperienceTable from "../../../components/Students/Experience/ExperienceTable";
import ExperienceForm from "../../../components/Students/Experience/ExperienceForm";

import Spinner from "./../../../components/Spinner/Spinner";
import Modal from "../../../hoc/Modal/Modal";
import Aux from "../../../hoc/Auxiliary";

// helper functions
import { getAge, checkFromTo } from "../../../common/timeHelperFunctions";

import "./Profile.css";

class Profile extends Component {
  state = {
    owner: true,
    infoModal: false,
    eduModal: false,
    expModal: false,
    eduEditIndex: "",
    expEditIndex: "",
    info: {
      name: "",
      dob: "",
      dept : "",
      cgpa: "",
      skills: "",
      enrollNo: "",
      introduction: "",
      address: "",
      phone: "",
      github: "",
      linkedin: ""
    },
    educationForm: {
      institute: "",
      degree: "",
      from: "",
      to: "",
      currently: false
    },
    experienceForm: {
      company: "",
      position: "",
      from: "",
      to: "",
      currently: false
    }
  };

  componentDidMount() {
    const { getProfile, auth, match } = this.props;
    const visitingId = match.params.id;
    if (visitingId) {
      this.setState({ owner: false });
      getProfile(visitingId);
    } else {
      getProfile(auth.uid);
    }
  }

  inputChangedHandler = (e, form) => {
    const { name, value } = e.target;

    if (form === "info") {
      const info = { ...this.state.info };
      info[name] = value;
      this.setState({ info });
    } else if (form === "edu") {
      const educationForm = { ...this.state.educationForm };
      educationForm[name] = value;
      this.setState({ educationForm });
    } else if (form === "exp") {
      const experienceForm = { ...this.state.experienceForm };
      experienceForm[name] = value;
      this.setState({ experienceForm });
    }
  };

  // info func
  personalInfoModalHandler = flag => {
    if (flag) {
      const info = { ...this.props.student };
      this.setState({ info });
    }
    this.setState({ infoModal: flag });
  };

  savePersonalInfoHandler = () => {
    const { auth, student, saveProfile } = this.props;
    const { info } = this.state;
    const { uid, email } = auth;
    if (info.dob ? getAge(info.dob) < 18 : false)
      alert("You can't be in university with this age!");
    else {
      const updatedStudent = { ...student, ...info, email };
      saveProfile(uid, updatedStudent);
      this.personalInfoModalHandler(false);
    }
  };

  // edu func
  educationModalHandler = (flag, eduEditIndex = "") => {
    if (eduEditIndex !== "") {
      const { education } = this.props.student;
      const educationForm = education[eduEditIndex];
      this.setState({ educationForm, eduEditIndex });
    } else {
      this.clearEduFields();
    }
    this.setState({ eduModal: flag });
  };

  saveEducationHandler = () => {
    const { eduEditIndex, educationForm } = this.state;
    const { auth, student, saveEdu } = this.props;
    const { education } = student;

    if (educationForm.currently) {
      // if currently working then from date must be in past
      if (checkFromTo(educationForm.from, Date.now())) {
        alert("Invalid starting date");
        return;
      }
      educationForm.to = "Now";
    } else {
      // check from is before to date
      if (checkFromTo(educationForm.from, educationForm.to)) {
        alert("Invalid to/from date");
        return;
      }
    }

    // if index present then put new at index, else create new
    if (eduEditIndex !== "") education[eduEditIndex] = educationForm;
    else education.push(educationForm);

    saveEdu(auth.uid, education);
    this.clearEduFields();
    this.educationModalHandler(false);
  };

  deleteEducationHandler = index => {
    const { auth, student, saveEdu } = this.props;
    const { education } = student;

    education.splice(index, 1);
    saveEdu(auth.uid, education);

    // clear fields if currently editing edu is delete
    if (index === this.state.eduEditIndex) this.clearEduFields();
  };

  // exp func
  experienceModalHandler = (flag, expEditIndex = "") => {
    if (expEditIndex !== "") {
      const { experience } = this.props.student;
      const experienceForm = experience[expEditIndex];
      this.setState({ experienceForm, expEditIndex });
    } else {
      this.clearExpFields();
    }
    this.setState({ expModal: flag });
  };

  saveExperienceHandler = () => {
    const { expEditIndex, experienceForm } = this.state;
    const { auth, student, saveExp } = this.props;
    const { experience } = student;

    if (experienceForm.currently) {
      // if currently working then from date must be in past
      if (checkFromTo(experienceForm.from, Date.now())) {
        alert("Invalid starting date");
        return;
      }
      experienceForm.to = "Now";
    } else {
      // check from is before to date
      if (checkFromTo(experienceForm.from, experienceForm.to)) {
        alert("Invalid to/from date");
        return;
      }
    }
    
    // if index present then put new at index, else create new
    if (expEditIndex !== "") experience[expEditIndex] = experienceForm;
    else experience.push(experienceForm);

      saveExp(auth.uid, experience);
      this.clearExpFields();
      this.experienceModalHandler(false);
  };

  deleteExperienceHandler = index => {
    const { auth, student, saveExp } = this.props;
    const { experience } = student;

    experience.splice(index, 1);
    saveExp(auth.uid, experience);

    // clear fields if currently editing exp is delete
    if (index === this.state.expEditIndex) this.clearExpFields();
  };

  clearEduFields = () => {
    this.setState({
      educationForm: {
        institute: "",
        degree: "",
        from: "",
        to: "",
        currently : false
      },
      eduEditIndex: ""
    });
  };

  clearExpFields = () => {
    this.setState({
      experienceForm: {
        company: "",
        position: "",
        from: "",
        to: "",
        currently : false
      },
      expEditIndex: ""
    });
  };

  render() {
    const { auth, student } = this.props;
    const {
      owner,
      infoModal,
      info,
      eduModal,
      educationForm,
      expModal,
      experienceForm
    } = this.state;
    const { loading } = auth;
    const {
      name,
      email,
      dob,
      github,
      cgpa,
      dept,
      linkedin,
      introduction,
      skills,
      address,
      phone,
      enrollNo,
      education,
      experience
    } = student;

    const stdudentInfo = [
      { key: "Name", value: name },
      { key: "Age", value: getAge(dob) },
      { key: "Department", value: dept },
      { key: "Current CGPA", value: cgpa },
      { key: "Skills", value: skills },
      { key: "Introduction", value: introduction },
      { key: "Enrollment Number", value: enrollNo },
      { key: "Address", value: address },
      { key: "Contact No", value: phone },
      { key: "Email", value: email },
      { key: "Github Handle", value: github },
      { key: "LinkedIn Handle", value: linkedin }
    ];

    return !loading ? (
      <div className="lol">
        <h1 className="main-heading-profile">Profile</h1>

        <div className="student-profile-card-container">
          <PersonalInfo
            info={stdudentInfo}
            onEdit={owner ? this.personalInfoModalHandler : ""}
          />
        </div>

        <div className="student-profile-education-container">
          <EducationTable
            education={education}
            editEducation={this.educationModalHandler}
            deleteEducation={this.deleteEducationHandler}
            owner={owner}
          />
          {owner ? (
            <Button
              variant="contained"
              className="add-eduEx-button"
              onClick={() => this.educationModalHandler(true)}
            >
              Add Education
            </Button>
          ) : ""}
        </div>

        <div className="student-profile-experience-container">
          <ExperienceTable
            experience={experience}
            editExperience={this.experienceModalHandler}
            deleteExperience={this.deleteExperienceHandler}
            owner={owner}
          />
          <br />
          {owner ? (
            <Button
              variant="contained"
              className="add-eduEx-button"
              onClick={() => this.experienceModalHandler(true)}
            >
              Add Experience
            </Button>
          ) : "" }
        </div>

        {/* only render modals for owner */}
        {owner ? (
          <Aux>
            <Modal open={infoModal} handleClose={this.personalInfoModalHandler}>
              <PersonalInfoForm
                info={info}
                inputChangedHandler={this.inputChangedHandler}
                onSubmit={this.savePersonalInfoHandler}
              />
            </Modal>

            <Modal open={eduModal} handleClose={this.educationModalHandler}>
              <EducationForm
                education={educationForm}
                inputChangedHandler={this.inputChangedHandler}
                onSubmit={this.saveEducationHandler}
              />
            </Modal>

            <Modal open={expModal} handleClose={this.experienceModalHandler}>
              <ExperienceForm
                experience={experienceForm}
                inputChangedHandler={this.inputChangedHandler}
                onSubmit={this.saveExperienceHandler}
              />
            </Modal>
          </Aux>
        ) : "" }
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
    student: state.student
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: uid => dispatch(actions.getProfile(uid)),
    saveProfile: (uid, payload) => dispatch(actions.saveProfile(uid, payload)),
    saveEdu: (uid, payload) => dispatch(actions.saveEduExp(uid, payload, "education")),
    saveExp: (uid, payload) => dispatch(actions.saveEduExp(uid, payload, "experience"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
