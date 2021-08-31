import { all, call } from "redux-saga/effects";
import userSagas from "./user/user.sagas";

export default function* saga() {
  yield all([call(userSagas)]);
}
