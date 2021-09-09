import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider,
} from "../../firebase/utils";

import userTypes from "./user.types";
import {
  signInSuccess,
  signOutUserSuccess,
  userError,
  recoverPasswordSuccess,
  isLoading,
} from "./user.actions";
import { handleRecoverPasswordAPI } from "./user.helpers";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    yield put(isLoading(true));
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(signInSuccess({ uid: snapshot.id, ...snapshot.data() }));
  } catch (err) {
    yield put(isLoading(false));
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    const errCode = err.code.substr(err.code.indexOf("/") + 1, err.code.length);
    let errMsg = "";
    if (errCode === "user-not-found") {
      errMsg = "No user found with this Email address.";
    } else if (errCode === "wrong-password") {
      errMsg =
        'Please try again with correct password or use "Forgot Password" option.';
    }
    yield put(userError(errMsg));
  }
}

export function* onEmailSignInStart() {
  console.log("USER_SAGA: onEmailSignInStart");
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    yield put(isLoading(false));
  }
}

export function* onCheckUserSession() {
  console.log("USER_SAGA: onCheckUserSession");
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    yield put(isLoading(false));
  }
}

export function* onSignOutUserStart() {
  console.log("USER_SAGA: onSignOutUserStart");

  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword },
}) {
  if (password !== confirmPassword) {
    const err = "Password doesn't match";
    yield put(userError(err));
    return;
  }
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = {
      displayName,
    };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (err) {
    yield put(userError(err.message));
  }
}
export function* onSignUpUserStart() {
  console.log("USER_SAGA: onSignUpUserStart");

  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* recoverPassword({ payload: { email } }) {
  try {
    yield call(handleRecoverPasswordAPI, email);
    yield put(recoverPasswordSuccess());
  } catch (err) {
    yield put(userError(err));
  }
}

export function* onRecoverPasswordStart() {
  console.log("USER_SAGA: onRecoverPasswordStart");
  yield takeLatest(userTypes.RECOVER_PASSWORD_START, recoverPassword);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    yield put(isLoading(false));
  }
}

export function* onGoogleSignInStart() {
  console.log("USER_SAGA: onGoogleSignInStart");
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onRecoverPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
