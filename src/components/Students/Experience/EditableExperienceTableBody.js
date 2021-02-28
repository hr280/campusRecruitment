import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ContextMenu from "../../ContextMenu/ContextMenu";

import Aux from "../../../hoc/Auxiliary";
import { getYear } from "../../../common/timeHelperFunctions";

const editableExperienceTableBody = props => {
  const { experience, editExperience, deleteExperience } = props;

  return experience.map((row, index) => (
    <Aux key={index}>
      <TableRow>
        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`experience-${index}`}>
            {row.company}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`experience-${index}`}>
            {row.position}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`experience-${index}`}>
            {getYear(row.from)}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`experience-${index}`}>
            {row.to === "Now" ? row.to : getYear(row.to)}
          </ContextMenuTrigger>
        </TableCell>
      </TableRow>

      <ContextMenu
        type="experience"
        index={index}
        onEdit={editExperience}
        onDelete={deleteExperience}
      />
    </Aux>
  ));
};

export default editableExperienceTableBody;
