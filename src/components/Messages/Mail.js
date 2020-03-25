import React from "react";
import dayjs from "dayjs";
import {getMailStatus} from "../../api/api";
import {updateStatus} from "../../redux/mail/mail.actions";
import {connect} from "react-redux";

const getStatus = (status) => {
  const statusNumber = +status;

  if (statusNumber === -1) {
    return <span className="text-success">Отправлено</span>
  } else if (statusNumber > -1) {
    return <span className="text-muted">В очереди</span>
  }
  return <span className="text-danger">Ошибка</span>;
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
      .then(res => {
        const {obj} = res;
        const {id, status} = obj;
        this.props.updateStatus(id, status);

        if(+status > -1) {
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
        <td className="text-right">{getStatus(mail.status)}</td>
      </tr>
    );
  }
}

const mapDispatchToProps = {updateStatus};
export default connect(null, mapDispatchToProps)(Mail);
