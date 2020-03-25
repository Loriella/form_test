import * as types from "./mail.types"
import {sendMail} from "../../api/api";

export const sendingMessage = (toEmail, letter) => dispatch => {
  dispatch({
    type: types.SEND_MESSAGE_REQUEST
  });
  return sendMail(toEmail, letter)
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
      dispatch(showSentMessageAlert());
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

const showSentMessageAlert = () => dispatch => {
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
