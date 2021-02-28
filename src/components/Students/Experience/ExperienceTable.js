import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import Aux from "../../../hoc/Auxiliary";
import EditableExperienceTableBody from "./EditableExperienceTableBody";
import { getYear } from "../../../common/timeHelperFunctions";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  comp: {
    width: "41%",
    padding: "2%"
  },
  pos: {
    width: "25%",
    padding: "2%"
  },
  from: {
    width: "9%",
    padding: "2%"
  },
  head: {
    color: "#1f4f16",
    fontWeight: "bold",
    fontSize: 14
  }
});

const experienceTable = props => {
  const {
    classes,
    experience,
    editExperience,
    deleteExperience,
    owner
  } = props;

  const { head, comp, pos, from } = classes;

  return experience.length > 0 ? (
    <Aux>
      <h2 className="sub-headings-student-profile">Experience</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" padding="none" className={[comp, head]}>
                Company
              </TableCell>
              <TableCell align="center" padding="none" className={[pos, head]}>
                Position
              </TableCell>
              <TableCell align="center" padding="none" className={[from, head]}>
                From
              </TableCell>
              <TableCell align="center" padding="none" className={[from, head]}>
                To
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            
            {/* render editable table for owner, static for rest */}
            {owner ? (
              <EditableExperienceTableBody
                experience={experience}
                editExperience={editExperience}
                deleteExperience={deleteExperience}
              />
            ) : (
              experience.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center" padding="none" className="td">
                    {row.company}
                  </TableCell>

                  <TableCell align="center" padding="none" className="td">
                    {row.position}
                  </TableCell>

                  <TableCell align="center" padding="none" className="td">
                    {getYear(row.from)}
                  </TableCell>

                  <TableCell align="center" padding="none" className="td">
                    {row.to === "Now" ? row.to : getYear(row.to)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Aux>
  ) : (
    <p className="no-vac-msg">No Experience to Show</p>
  );
};

export default withStyles(styles)(experienceTable);
