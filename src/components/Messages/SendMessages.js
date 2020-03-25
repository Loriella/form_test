import React from "react";
import {connect} from "react-redux";
import "dayjs/locale/ru";
import Mail from "./Mail";

const SendMessages = ({mails}) => (
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
              <Mail
                key={mail.track_id}
                mail={mail}
              />
            ))}
            </tbody>
          </table>
        )
        : <div className="pl-1">Сообщения еще не отправлялись</div>
    }
  </div>
);

const mapStateToProps = state => {
  return {
    mails: state.mail.mails
  }
};

export default connect(mapStateToProps)(SendMessages);
