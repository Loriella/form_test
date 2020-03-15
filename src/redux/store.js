import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import * as types from "./mail/mail.types";
import {composeWithDevTools} from "redux-devtools-extension";
import {updateStatuses} from "./mail/mail.actions";

let res;

const updateStatusesMiddleware = ({dispatch, getState}) => next => action => {
  if (action.type === types.UPDATE_STATUS || action.type === types.SET_SENT) {
    clearTimeout(res);
    res = setTimeout(() => {
      const mails = getState().mail.mails;
      dispatch(updateStatuses(mails));
    }, 10000)
  }
  return next(action);
};


const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, updateStatusesMiddleware)
  )
);

export default store;
