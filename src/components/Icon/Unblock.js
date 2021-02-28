import React from "react";

const unblockIcon = props => (
  <span className="unblock-icon" onClick={() => props.onUnblock(props.id)}>
    <i className="fas fa-unlock" />
  </span>
);

export default unblockIcon;
