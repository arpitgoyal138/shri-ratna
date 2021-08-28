import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { auth, signInWithGoogle } from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";
import AuthWrapper from "../authWrapper";
import { withRouter } from "react-router-dom";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/admin");
    } catch (err) {
      console.log(err);
      const errCode = err.code.substr(
        err.code.indexOf("/") + 1,
        err.code.length
      );
      if (errCode === "user-not-found") {
        setMessage("No user found with this Email address.");
      } else if (errCode === "wrong-password") {
        setMessage(
          'Please try again with correct password or use "Forgot Password" option.'
        );
      }
    }
  };

  return (
    <AuthWrapper headline="Login">
      <form onSubmit={handleFormSubmit}>
        {message !== "" && (
          <ul>
            <li className="err_list">{message}</li>
          </ul>
        )}
        <Button type="button" className="social_btn" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>

        <FormInput
          label="Email"
          autoComplete="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
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

export default withRouter(Signin);
