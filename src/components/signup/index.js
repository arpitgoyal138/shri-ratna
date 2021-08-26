import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";
import { auth, handleUserProfile } from "./../../firebase/utils";
const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
    console.log(password, confirmPassword);

    if (password !== confirmPassword) {
      const err = ["Password doesn't match"];
      this.setState({
        errors: err,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState,
      });
    } catch (err) {}
  };
  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar style={{ margin: "8px", backgroundColor: "#3f51b5" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <div className="wrap">
            {errors.length > 0 && (
              <ul>
                {errors.map((err, index) => {
                  return (
                    <li className="err_list" key={index}>
                      {err}
                    </li>
                  );
                })}
              </ul>
            )}
            <form className="formWrap" onSubmit={this.handleFormSubmit}>
              <FormInput
                label="Full name"
                autoComplete="displayName"
                type="text"
                name="displayName"
                value={displayName}
                onChange={this.handleChange}
                autoFocus
                required
              />
              <FormInput
                label="Email"
                autoComplete="email"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
              <FormInput
                label="Password"
                autoComplete="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                required
              />
              <FormInput
                label="Confirm Password"
                autoComplete="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
              />
              <Button type="submit">Register</Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </Container>
    );
  }
}
