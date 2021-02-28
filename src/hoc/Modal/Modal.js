import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    margin: "auto",
    color: "#1f4f16"
  }
});

const modal = props => {
  const { children, open, handleClose, classes } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="form-dialog-title"
        className={classes.paper}
      >
        <span className="block-icon" onClick={() => handleClose(false)}>
          <i className="fas fa-times" />
        </span>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(modal);
