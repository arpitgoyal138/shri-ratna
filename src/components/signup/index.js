import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";
import AuthWrapper from "../authWrapper";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/user/user.actions";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError,
});

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentUser, userError } = useSelector(mapState);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/admin");
    }
  }, [currentUser]);

  useEffect(() => {
    if (userError !== "") {
      setMessage(userError);
    }
  }, [userError]);
  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
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

export default SignUp;
