import React from "react";
import Field from "./FormElements/Field";
import FieldFile from "./FormElements/FieldFile";
import Attachment from "./FormElements/Attachment";
import {connect} from "react-redux";
import {sendingMessage} from "../../redux/mail/mail.actions";
import FieldTextarea from "./FormElements/FieldTextarea";
import DropModal from "./FormElements/DropModal";

const MAX_FILES_SIZE = 20971520;
export const MAX_FILE_SIZE = 5242880;

const initialFormState = {
  values: {
    from_name: "",
    from_email: "",
    to_name: "",
    to_email: "",
    email_subject: "",
    message: "",
    attaches: []
  },
  errors: {},
  show_drop_modal: false
};

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialFormState
    }
  }

  validation = () => {

    const errors = {};
    const regexForEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const {
      values: {
        from_name,
        from_email,
        to_name,
        to_email,
        email_subject,
        message,
        attaches
      }
    } = this.state;

    if (from_name.length === 0) {
      errors.from_name = "Введите имя отправителя"
    }

    if (!regexForEmail.test(from_email)) {
      errors.from_email = "Введен неверный email";
    }

    if (to_name.length === 0) {
      errors.to_name = "Введите имя получателя"
    }

    if (!regexForEmail.test(to_email)) {
      errors.to_email = "Введен неверный email";
    }

    if (email_subject.length === 0) {
      errors.email_subject = "Введите тему письма"
    }

    if (message.length === 0) {
      errors.message = "Введите сообщение"
    }

    const sumSizesFiles = attaches.reduce((acc, file) => file.size + acc, 0);

    if (sumSizesFiles > MAX_FILES_SIZE) {
      errors.attaches = "Суммарный размер файлов превышает 20 МБ"
    }

    return errors;
  };

  normalizeValue = ({name, value, file_name, size}, values) => {
    switch (name) {
      case "attaches":
        return [
          ...values.attaches, {
            file_name,
            size,
            value
          }];

      default:
        return value
    }
  };

  onChange = event => {
    const {name, value, file_name, size} = event.target;

    this.setState(state => ({
     values: {
       ...state.values,
       [name]: this.normalizeValue({name, value, file_name, size}, state.values)
     },
        errors: {
          ...state.errors,
          [name]: false,
        },
    }))
  };

  onDelete = index => {
    const newFiles = this.state.values.attaches.filter((_, indexFile) => indexFile !== index);
    this.setState({
      values: {
        ...this.state.values,
        attaches: newFiles
      }
    })
  };

  prepareLetterForServer = (values) => {
    const {email_subject, from_name, from_email, to_name, message, attaches} = values;

    return {
      "subject": email_subject,
      "from.name": from_name,
      "from.email": from_email,
      "to.name": to_name,
      "message": {"text": message},
      "attaches": attaches.map((file) => (
        {
          "name": file.file_name,
          "content": file.value,
          "encoding": "base64",
        }
      ))
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validation();

    if (Object.values(errors).length > 0) {
      this.setState({
        errors,
      })
    } else {
      const letter = this.prepareLetterForServer(this.state.values);

      this.props.sendingMessage(this.state.values.to_email, letter)
    }
  };

  showDropZone = () => {
    this.setState({
      show_drop_modal: true
    })
  };

  hideDropZone = () => {
    this.setState({
      show_drop_modal: false
    })
  };

  onDrop = event => {
    event.preventDefault();
    this.setState({
      show_drop_modal: false
    });
    const file = event.dataTransfer.files[0];

    if (file.size > MAX_FILE_SIZE) {
      this.updateFileError("Слишком большой файл");
      return "invalid";
    }

    const reader = new FileReader();

    reader.onload = ev => {
      this.onChange({
        target: {
          name: "attaches",
          value: ev.target.result,
          size: file.size,
          file_name: file.name
        },
      });
    };
    reader.readAsDataURL(file);

  };

  updateFileError = (errorMessage) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        attaches: errorMessage
      }
    }))
  };

  render() {
    const {values, errors} = this.state;

    return (
      <div className="position-relative">
        <form
          className="form p-4 mt-4"
          noValidate
          onDragOver={this.showDropZone}
        >
          <h3>Отправлялка сообщений</h3>
          <div>
            <div className="form-row">
              <div className="col-md-6 pr-0 pt-2">
                <Field
                  id="from_name"
                  labelText="От кого"
                  placeholder="Имя"
                  name="from_name"
                  value={values.from_name}
                  onChange={this.onChange}
                  error={errors.from_name}
                />
              </div>
              <div className="col-md-6 pl-0 pt-2">
                <Field
                  id="from_email"
                  labelText="Email"
                  placeholder="Email"
                  name="from_email"
                  type="email"
                  value={values.from_email}
                  onChange={this.onChange}
                  error={errors.from_email}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="form-row">
              <div className="form-group col-md-6 pr-0 pt-3">
                <Field
                  id="to_name"
                  labelText="Кому"
                  placeholder="Имя"
                  name="to_name"
                  value={values.to_name}
                  onChange={this.onChange}
                  error={errors.to_name}
                />
              </div>
              <div className="form-group col-md-6 pl-0 pt-3">
                <Field
                  id="to_email"
                  labelText="Email"
                  placeholder="Email"
                  name="to_email"
                  type="email"
                  value={values.to_email}
                  onChange={this.onChange}
                  error={errors.to_email}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <Field
                id="email_subject"
                labelText="Тема письма"
                placeholder="Тема письма"
                name="email_subject"
                value={values.email_subject}
                onChange={this.onChange}
                error={errors.email_subject}
              />
            </div>
          </div>
          <div className="form-row">
            <FieldTextarea
              id="message"
              labelText="Сообщение"
              name="message"
              rows="6"
              value={values.message}
              onChange={this.onChange}
              error={errors.message}
            />
          </div>
          <div className="">
            <div className="row">
              {
                values.attaches.map((file, index) => (
                  <Attachment
                    key={index}
                    file_name={file.file_name}
                    index={index}
                    onDelete={this.onDelete}
                  />

                ))
              }
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <FieldFile
                onChange={this.onChange}
                updateFileError={this.updateFileError}
                name="attaches"
                error={errors.attaches}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-25"
            onClick={this.onSubmit}
            disabled={this.props.sending}
          >
            Отправить
          </button>
        </form>
        {this.state.show_drop_modal &&
        <DropModal
          onDragLeave={this.hideDropZone}
          onDrop={this.onDrop}
        />
        }
      </div>
    )
  }
}

const mapDispatchToProps = {sendingMessage};
const mapStateToProps = state => {
  return {
    sending: state.sending
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);
