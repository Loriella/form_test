import React from "react";
import dayjs from "dayjs";
import {getMailStatus} from "../../api/api";
import {updateStatus} from "../../redux/mail/mail.actions";
import {connect} from "react-redux";

const EMAIL_STATUS_SENT = -1;

const getStatus = status => {
  const statusNumber = Number(status);

  if (statusNumber === EMAIL_STATUS_SENT) {
    return "sent"
  } else if (statusNumber > EMAIL_STATUS_SENT) {
    return "in_queue"
  }
  return "error";
};

const getMessage = status => {
  let message = getStatus(status);

  switch (message) {
    case "sent":
      return <span className="text-success">Отправлено</span>;
    case "in_queue":
      return <span className="text-muted">В очереди</span>;
    default:
      return <span className="text-danger">Ошибка</span>;
  }
};

class Mail extends React.Component {
  idTimeout = null;

  componentDidMount() {
    this.checkStatus();
  }

  componentWillUnmount() {
    clearTimeout(this.idTimeout);
  }

  checkStatus = () => {
    getMailStatus(this.props.mail.track_id)
      .then(response => {
        const {obj: {id, status}} = response;
        this.props.updateStatus(id, status);

        if (Number(status) > -1) {
          this.idTimeout = setTimeout(() => {
            this.checkStatus()
          }, 3000);
        }
      });
  };

  render() {
    const {mail} = this.props;

    return (
      <tr>
        <td className="cell-w">{dayjs(mail.date).locale("ru").format("DD MMMM")}</td>
        <td colSpan="2" className="text-over">{mail.subject}</td>
        <td className="text-right">{getMessage(mail.status)}</td>
      </tr>
    );
  }
}

const mapDispatchToProps = {updateStatus};
export default connect(null, mapDispatchToProps)(Mail);
