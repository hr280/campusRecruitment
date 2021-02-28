import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Aux from "../../../hoc/Auxiliary";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { getYear } from "../../../common/timeHelperFunctions";

const editableEducationTableBody = props => {
  const { education, editEducation, deleteEducation } = props;

  return education.map((row, index) => (
    <Aux key={index}>
      <TableRow>
        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`education-${index}`}>
            {row.institute}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`education-${index}`}>
            {row.degree}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`education-${index}`}>
            {getYear(row.from)}
          </ContextMenuTrigger>
        </TableCell>

        <TableCell align="center" padding="none" className="ctxMenuTrigger td">
          <ContextMenuTrigger id={`education-${index}`}>
            {row.to === "Now" ? row.to : getYear(row.to)}
          </ContextMenuTrigger>
        </TableCell>
      </TableRow>

      <ContextMenu
        type="education"
        index={index}
        onEdit={editEducation}
        onDelete={deleteEducation}
      />
    </Aux>
  ));
};

export default editableEducationTableBody;
