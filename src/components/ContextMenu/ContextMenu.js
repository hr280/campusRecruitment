import React from "react";
import { ContextMenu, MenuItem } from "react-contextmenu";

const contextMenu = props => {
  const { type, index, onEdit, onDelete } = props;
  return (
    <ContextMenu id={`${type}-${index}`} className="ctxMenu">
      <MenuItem onClick={() => onEdit(true, index)} className="ctxMenuItem">
        Edit
      </MenuItem>

      <div className="ctxMenuItemDivider" />

      <MenuItem onClick={() => onDelete(index)} className="ctxMenuItem">
        Delete
      </MenuItem>
    </ContextMenu>
  );
};

export default contextMenu;
