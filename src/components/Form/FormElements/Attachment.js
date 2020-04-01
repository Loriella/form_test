import React from "react";
import clipLarge from "../../../assets/images/clip-large.png";
import trash from "../../../assets/images/trash.png";

const Attachment = ({file_name, onDelete, index}) => (
  <div className="col-md-6">
    <div className="rounded attachment d-flex justify-content-between align-items-center">
      <img src={clipLarge} alt="clip-large"/>
      <span>{file_name}</span>
      <button
        className="attachment-delete"
        onClick={(event) => {
          event.preventDefault();
          onDelete(index)
        }}
      >
        <img src={trash} alt="trash" className="pr-2"/>
        Удалить
      </button>
    </div>
  </div>
);

export default Attachment;
