import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import AuthWrapper from "../authWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";
import { useDispatch, useSelector } from "react-redux";
import { recoverPasswordStart } from "../../redux/user/user.actions";
const mapState = ({ user }) => ({
  recoverPasswordSuccess: user.recoverPasswordSuccess,
  userError: user.userError,
});
const RecoverPassword = () => {
  const { recoverPasswordSuccess, userError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (recoverPasswordSuccess) {
      setSuccess("Link sent");
      setError("");
    }
  }, [recoverPasswordSuccess]);

  useEffect(() => {
    if (userError !== "") {
      setSuccess("");
      setError(userError);
    }
  }, [userError]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(recoverPasswordStart({ email }));
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
          <Grid item xs></Grid>
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
