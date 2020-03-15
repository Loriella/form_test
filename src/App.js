import React from "react";
import SendMessages from "./components/PageElements/SendMessages";
import SentMessage from "./components/PageElements/SentMessage";
import Form from "./components/PageElements/Form";
import {connect} from "react-redux";

const App = ({sent}) => (
  <div className="container">
    <div className="wrapper">
      {
        !sent
          ? <Form/>
          : <SentMessage/>
      }
      <SendMessages/>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    sent: state.mail.sent
  }
};

export default connect(mapStateToProps)(App);
