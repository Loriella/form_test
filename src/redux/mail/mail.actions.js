import * as types from "./mail.types"
import {getMailStatus, sendMail} from "../../api/api";

export const sendingMessage = (toEmail, letter) => dispatch => {
  dispatch({
    type: types.SEND_MESSAGE_REQUEST
  });
  sendMail(toEmail, letter)
    .then((res) => {
      dispatch({
        type: types.SEND_MESSAGE_SUCCESS,
        payload: {
          track_id: res["track.id"],
          status: "0",
          to_email: toEmail,
          subject: letter.subject,
          date: new Date()
        }
      });
      dispatch(messageSent());

    })
    .catch(error => {
      dispatch({
        type: types.SEND_MESSAGE_ERROR,
        payload: {
          track_id: -new Date().getTime(),
          status: "-2",
          subject: letter.subject,
          date: new Date()
        }
      })
    })
};

const messageSent = () => dispatch => {
  dispatch({
    type: types.SET_SENT
  });
  setTimeout(() => {
    dispatch({
      type: types.UNSET_SENT
    })
  }, 5000)
};

export const updateStatus = (id, status) => dispatch => {
  dispatch({
    type: types.UPDATE_STATUS,
    id,
    status
  })
};

export const updateStatuses = (mailsList) => dispatch => {
  const mailsForGetStatus = mailsList.filter(mail => +mail.status > -1);

  mailsForGetStatus.forEach(mail => getMailStatus(mail.track_id)
    .then(i => {
      console.log(i);
      const {obj} = i;
      const {id, status} = obj;
      dispatch(updateStatus(id, status))
    }));
};
