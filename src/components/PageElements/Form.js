import React from "react";
import Field from "../FormElements/Field";
import FieldFile from "../FormElements/FieldFile";

const Form = props => {
  const {values, errors, onChange, onSubmit} = props;

  return (
    <div>
      <h2>Отправлялка сообщений</h2>
      <div>
        <div className="form-row">
          <div className="col-md-6 px-0 pt-2">
            <Field
              id="from_name"
              labelText="От кого"
              placeholder="Имя"
              name="from_name"
              value={values.from_name}
              onChange={onChange}
              error={errors.from_name}
            />
          </div>
          <div className="col-md-6 px-0 pt-2">
            <Field
              id="from_email"
              labelText="Email"
              placeholder="Email"
              name="from_email"
              type="email"
              value={values.from_email}
              onChange={onChange}
              error={errors.from_email}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="form-row">
          <div className="form-group col-md-6 px-0 pt-3">
            <Field
              id="to_name"
              labelText="Кому"
              placeholder="Имя"
              name="to_name"
              value={values.to_name}
              onChange={onChange}
              error={errors.to_name}
            />
          </div>
          <div className="form-group col-md-6 px-0 pt-3">
            <Field
              id="to_email"
              labelText="Email"
              placeholder="Email"
              name="to_email"
              type="email"
              value={values.to_email}
              onChange={onChange}
              error={errors.to_email}
            />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col px-0">
          <Field
            id="email_subject"
            labelText="Тема письма"
            placeholder="Тема письма"
            name="email_subject"
            value={values.email_subject}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col px-0 mb-1">
          <label htmlFor="message">Сообщение</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="6"
            value={values.message}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6 px-0">
          <FieldFile/>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary w-25"
        onClick={onSubmit}
      >
        Отправить
      </button>
    </div>
  )
};

export default Form;
