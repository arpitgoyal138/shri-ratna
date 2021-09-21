import { auth } from "../../firebase/utils";

export const handleRecoverPasswordAPI = (email) => {
  const config = {
    url: "https://shri-ratna-bbfb5.web.app/login",
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("No user registered with this Email address.");
      });
  });
};
