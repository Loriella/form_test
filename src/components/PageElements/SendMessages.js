import React from "react";
import {connect} from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import * as PropTypes from "prop-types";
import {updateStatuses} from "../../redux/mail/mail.actions";

const getStatus = (status) => {
  const statusNumber = +status;

  if (statusNumber === -1) {
    return <span className="text-success">Отправлено</span>
  } else if (statusNumber > -1) {
    return <span className="text-muted">В очереди</span>
  } else {
    return <span className="text-danger">Ошибка</span>
  }
};

class SendMessages extends React.Component {
  componentDidMount() {
    this.props.updateStatuses(this.props.mails)
  }

  render() {
    const {mails} = this.props;
    return (
      <div className="pt-4">
        <h3 className="pl-1">Отправленные сообщения</h3>
        {
          mails.length > 0
            ? (<table className="table table-sm table-borderless">
                <thead>
                <tr>
                  <th className="cell-w" scope="col">Дата</th>
                  <th scope="col" colSpan="2" className="text-over">Тема</th>
                  <th className="cell-w text-right" scope="col">Статус</th>
                </tr>
                </thead>
                <tbody>
                {mails.map(mail => (
                  <tr key={mail.track_id}>
                    <td className="cell-w">{dayjs(mail.date).locale("ru").format("DD MMMM")}</td>
                    <td colSpan="2" className="text-over">{mail.subject}</td>
                    <td className="text-right">{getStatus(mail.status)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            )
            : <div className="pl-1">Сообщения еще не отправлялись</div>
        }
      </div>
    )
  }
}

SendMessages.propTypes = {mails: PropTypes.any};

const mapStateToProps = state => {
  return {
    mails: state.mail.mails
  }
};

const mapDispatchToProps = dispatch => ({
  updateStatuses: (mailsList) => dispatch(updateStatuses(mailsList))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessages);
