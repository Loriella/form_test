import React from "react";
import classNames from "classnames";

const FieldTextarea = props => {
  const {
    id,
    labelText,
    name,
    rows,
    value,
    onChange,
    error
  } = props;

  return (
    <div className="form-group col mb-1">
      <label htmlFor={id}>{labelText}</label>
      <textarea
        className={classNames("form-control", {"is-invalid": error})}
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  )
};

export default FieldTextarea;
