import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";
import "./../../App.scss";
import AuthWrapper from "../authWrapper";
import { useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleSignInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  return (
    <AuthWrapper headline="Login">
      <form onSubmit={handleFormSubmit}>
        {message !== "" && (
          <ul>
            <li className="err_list">{message}</li>
          </ul>
        )}
        <Button
          type="button"
          className="social_btn"
          onClick={handleSignInWithGoogle}
        >
          Sign in with Google
        </Button>

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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit">Log in</Button>
        <Grid container>
          <Grid item xs>
            <Link href="/recovery" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthWrapper>
  );
};

export default Signin;
