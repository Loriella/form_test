import React from "react";
import clipLarge from "./img/clip-large.png";
import trash from "./img/trash.png";

class Attachment extends React.Component {
  render() {
    return (
      <div className="rounded attachment flex-fill col-md-6">
        <div className="d-flex justify-content-between align-items-center">
          <img src={clipLarge} alt="clip-large"/>
          <span>File name</span>
          <button className="attachment-delete">
            <img src={trash} alt="trash" className="pr-2"/>
            Удалить
          </button>
        </div>
      </div>
    )
  }
}

export default Attachment;
