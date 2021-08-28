import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../authWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log("Link sent");
          setEmail("");
          setError("");
          setSuccess("Link sent to email.");
        })
        .catch((err) => {
          setSuccess("");
          setError("No user registered with this Email address.");
          console.log("err", err.message);
        });
    } catch (err) {
      setSuccess("");
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <AuthWrapper headline="Reset Password">
      <form onSubmit={handleFormSubmit}>
        {error !== "" && (
          <ul>
            <li className="err_list">{error}</li>
          </ul>
        )}
        {success !== "" && (
          <ul>
            <li className="success_list">{success}</li>
          </ul>
        )}
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

        <Button type="submit">Send Link to Email</Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="/recovery" variant="body2">
              Forgot password?
            </Link> */}
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

export default RecoverPassword;
