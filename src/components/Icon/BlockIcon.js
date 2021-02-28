import React from "react";

const blockIcon = props => (
  <span className="block-icon" onClick={() => props.onBlock(props.id)}>
    <i className="fas fa-lock" />
  </span>
);

export default blockIcon;
