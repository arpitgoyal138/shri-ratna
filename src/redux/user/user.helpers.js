import { auth } from "../../firebase/utils";

export const handleRecoverPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
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
