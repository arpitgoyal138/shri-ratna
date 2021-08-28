import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";

import { auth, handleUserProfile } from "./../../firebase/utils";
import AuthWrapper from "../authWrapper";
import { withRouter } from "react-router-dom";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      const err = "Password doesn't match";
      setMessage(err);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push("/admin");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <AuthWrapper headline="Register">
      {message !== "" && (
        <ul>
          <li className="err_list">{message}</li>
        </ul>
      )}
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Full name"
          autoComplete="displayName"
          type="text"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          autoFocus
          required
        />
        <FormInput
          label="Email"
          autoComplete="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          autoComplete="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          label="Confirm Password"
          autoComplete="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(SignUp);
