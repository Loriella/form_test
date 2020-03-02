import React from "react";
import Form from "./components/PageElements/Form";
import SendMessages from "./components/PageElements/SendMessages";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        from_name: "",
        from_email: "",
        to_name: "",
        to_email: "",
        email_subject: "",
        message: "",
      },
      errors: {
        from_name: false,
        from_email: false,
        to_name: false,
        to_email: false,
      }
    }
  }

  onChange = event => {
    const {name, value} = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }))
  };

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

    return errors;
  };

  onSubmit = event => {
    event.preventDefault();
    const errors = this.validation();

    if (Object.keys(errors).length > 0) {
      this.setState( {
        errors,
      })
    } else {
      this.setState({
        errors: {}
      })
    }
  };

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <form className="form p-4 mt-4 ">
            <Form
              values={this.state.values}
              errors={this.state.errors}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </form>

          <SendMessages/>
        </div>
      </div>
    )
  }
}
export default App;
