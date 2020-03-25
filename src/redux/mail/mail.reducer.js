import * as types from "./mail.types";

const initialState = {
  mails: [],
  sending: false,
  send_mail: false
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        sending: true
      };

    case types.SEND_MESSAGE_SUCCESS:
    case types.SEND_MESSAGE_ERROR:
      return {
        ...state,
        mails: [action.payload, ...state.mails],
        sending: false
      };

    case types.SET_SENT:
      return {
        ...state,
        send_mail: true
      };

    case types.UNSET_SENT:
      return {
        ...state,
        send_mail: false
      };

    case types.UPDATE_STATUS:
      const {id, status} = action;
      const mails = state.mails.map(mail => {
        if(id === mail.track_id) {
          return {
            ...mail,
            status
          }
        }
        return mail
      });

      return {
        ...state,
        mails
      };

    default:
      return state
  }
};

export default mailReducer;
