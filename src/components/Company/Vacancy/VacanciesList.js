import React from "react";
import { Link } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";

import Card from "../../../hoc/Card";
import ContextMenu from "../../ContextMenu/ContextMenu";

// helper functions
import navigationHandler from "../../../common/navigationHandler";
import { getTime, getDate } from "../../../common/timeHelperFunctions";

import "./VacancyList.css";
import "../../../common/ContextMenu.css";

const vacanciesList = props => {
  const {
    deleteVacancy,
    editVacancy,
    vacancies,
    owner,
    admin,
    profile
  } = props;

  if (vacancies.length > 0) {
    const vacancyInfoArray = vacancies.map(vacancy => [
      { key: "Posted By", value: vacancy.postedBy },
      { key: "Posted At", value: getTime(vacancy.postedAt) },
      { key: "Last Date to Apply", value: getDate(vacancy.lastDate) },
      { key: "Required Skills", value: vacancy.skills },
      { key: "Minimum CGPA", value: vacancy.gpa },
      { key: "Starting Salary", value: vacancy.salary },
      { key: "Details", value: vacancy.description }
    ]);

    return vacancyInfoArray.map((vacancyInfo, index) => {
      return (
        <div className="my-vacancies" key={index}>
          {/* don't navigate if owner, admin or visitor clicks on card */}
          <Link
            to={`/profile/${vacancies[index].postedById}`}
            style={{ textDecoration: "none" }}
            onClick={e => navigationHandler(e, admin || owner || profile)}
          >
            <Card>
              <ContextMenuTrigger id={`vacancy-${index}`}>
                <div className="card-text" style={{ position: "relative" }}>
                  {vacancyInfo.map(info => (
                    <p className="info-container" key={info.key}>
                      <span className="info-key">{info.key}: </span>
                      <span>{info.value}</span>
                    </p>
                  ))}
                </div>
              </ContextMenuTrigger>
            </Card>
          </Link>

          {/* render menu only if owner */}
          {owner ? (
            <ContextMenu
              type="vacancy"
              index={index}
              onEdit={editVacancy}
              onDelete={deleteVacancy}
            />
          ) : "" }
        </div>
      );
    });
  } else {
    return <p className="no-vac-msg">No Vacancies to Show</p>;
  }
};

export default vacanciesList;