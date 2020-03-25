import React from "react";
import {connect} from "react-redux";

const SendMail = ({to_email}) => (
  <div className="sent-m mt-4">
    <div className="sent-m-wrap">
      <h3>Сообщение поставлено в очередь на отправку</h3>
      <p>Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты
        получателя &#171;{to_email}&#187; со скоростью электронов</p>
    </div>
  </div>
);

const mapStateToProps = state => {
  const email = state.mail.mails[0];
  return {
    to_email: email && email.to_email
  }
};

export default connect(mapStateToProps)(SendMail);
