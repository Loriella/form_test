import React from "react";
import Field from "../FormElements/Field";
import FieldFile from "../FormElements/FieldFile";
import Attachment from "../FormElements/Attachment";
import {connect} from "react-redux";
import {sendingMessage} from "../../redux/mail/mail.actions";
import FieldTextarea from "./FieldTextarea";
import DropModal from "./DropModal";

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
    file: []
  },
  errors: {},
  drag: false
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


    if (this.state.values.from_name.length === 0) {
      errors.from_name = "Введите имя отправителя"
    }

    if (!regexForEmail.test(this.state.values.from_email)) {
      errors.from_email = "Введен неверный email";
    }

    if (this.state.values.to_name.length === 0) {
      errors.to_name = "Введите имя получателя"
    }

    if (!regexForEmail.test(this.state.values.to_email)) {
      errors.to_email = "Введен неверный email";
    }

    if (this.state.values.email_subject.length === 0) {
      errors.email_subject = "Введите тему письма"
    }

    if (this.state.values.message.length === 0) {
      errors.message = "Введите сообщение"
    }

    const sumSizesFiles = this.state.values.file.reduce((acc, file) => {
      return file.size + acc
    }, 0);

    if(sumSizesFiles > MAX_FILES_SIZE) {
      errors.file = "Суммарный размер файлов превышает 20 МБ"
    }


    return errors;
  };

  onChange = event => {
    const {name, value, file_name, size} = event.target;

    this.setState(state => {
      let newFile;
      if (name === "file") {
        newFile = [
          ...state.values.file, {
            file_name,
            size,
            value
          }];
      }
      return ({
        values: {
          ...state.values,
          [name]: newFile || value
        },
        errors: {
          ...state.errors,
          [name]: false,
        },
      });
    })
  };

  onDelete = index => {
    const newFiles = this.state.values.file.filter((f, i) => i !== index);
    this.setState({
      values: {
        ...this.state.values,
        file: newFiles
      }
    })
  };

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validation();

    if (Object.values(errors).length > 0) {
      this.setState({
        errors,
      })
    } else {
      const letter = {
        "subject": this.state.values.email_subject,
        "from.name": this.state.values.from_name,
        "from.email": this.state.values.from_email,
        "to.name": this.state.values.to_name,
        "message": {"text": this.state.values.message},
        "attaches": this.state.values.file.map((file) => (
          {
            "name": file.file_name,
            "content": file.value,
            "encoding": "base64",
          }
        ))
      };

      this.props.sendingMessage(this.state.values.to_email, letter);
      this.setState({
        ...initialFormState,
      });
    }
  };

  showDropZone = () => {
    this.setState({
      drag: true
    })
  };

  hideDropZone = () => {
    this.setState({
      drag: false
    })
  };

  onDrop = event => {
    console.log("OnDrop");
    event.preventDefault();
    this.setState({
      drag: false
    });
    const file = event.dataTransfer.files[0];

    if (file.size > MAX_FILE_SIZE) {
      this.onFileError("Слишком большой файл");
      return;
    }

    const reader = new FileReader();

    reader.onload = ev => {
      this.onChange({
        target: {
          name: "file",
          value: ev.target.result,
          size: file.size,
          file_name: file.name
        },
      });
    };
    reader.readAsDataURL(file);

  };

  onFileError = (errorMessage) => {
    this.setState(state => ({
      errors: {
        ...state.errors,
        file: errorMessage
      }
    }))
  };

  render() {
    const {values, errors} = this.state;
    const {onChange, onSubmit, onDelete, onDrop, hideDropZone, onFileError} = this;

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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                onChange={onChange}
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
              onChange={onChange}
              error={errors.message}
            />
          </div>
          <div className="">
            <div className="row">
              {
                values.file.map((file, index) => (
                  <Attachment
                    key={index}
                    file_name={file.file_name}
                    index={index}
                    onDelete={onDelete}
                  />

                ))
              }
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <FieldFile
                onChange={onChange}
                onFileError={onFileError}
                name="file"
                error={errors.file}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-25"
            onClick={onSubmit}
          >
            Отправить
          </button>
        </form>
        {this.state.drag &&
          <DropModal
            onDragLeave={hideDropZone}
            onDrop={onDrop}
          />
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  sendingMessage: (toEmail, letter) => dispatch(sendingMessage(toEmail, letter))
});

export default connect(null, mapDispatchToProps)(Form);
