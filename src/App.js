import React from "react";
import SendMessages from "./components/Messages/SendMessages";
import SentMessage from "./components/SendMail/SendMail";
import Form from "./components/Form/Form";
import {connect} from "react-redux";

const App = ({send_mail}) => (
  <div className="container">
    <div className="wrapper">
      {
        send_mail
          ? <SentMessage/>
          : <Form/>
      }
      <SendMessages/>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    send_mail: state.mail.send_mail
  }
};

export default connect(mapStateToProps)(App);
