import React from "react";
import clip from "./img/clip.png";

const FieldFile = () => {
  return (
    <div className="form-group">
      <img src={clip} alt="clip"/>
      <label htmlFor="file" className="label-file">Прикрепить файл</label>
      <input
        className="input-file"
        id="file"
        name="file"
        type="file"
        multiple
      />
    </div>
  )
};

export default FieldFile;
