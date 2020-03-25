import React from "react";
import clip from "../img/clip.png";
import classNames from "classnames";
import {MAX_FILE_SIZE} from "../Form";

const FieldFile = props => {
  const {onChange, updateFileError, name, error} = props;

  const onChangeFile = event => {
    const file = event.target.files[0];

    if (file.size > MAX_FILE_SIZE) {
      updateFileError("Слишком большой файл");
      return;
    }

    const reader = new FileReader();

    reader.onload = ev => {
      onChange({
        target: {
          name: name,
          value: ev.target.result,
          size: file.size,
          file_name: file.name
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="form-group">
      <img src={clip} alt="clip"/>
      <label htmlFor="attaches" className="label-file">Прикрепить файл</label>
      <input
        className={classNames("input-file", {"is-invalid": error})}
        id={name}
        name={name}
        type="file"
        onChange={onChangeFile}
        accept=".jpg,.png,.gif,.doc,.xls,.pdf,.zip"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
};

export default FieldFile;
