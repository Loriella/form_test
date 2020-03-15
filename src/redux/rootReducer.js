import {combineReducers} from "redux";
import mailReducer from "./mail/mail.reducer";

export default combineReducers({
  mail: mailReducer
})
