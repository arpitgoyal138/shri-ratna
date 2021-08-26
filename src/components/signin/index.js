import React, { Component, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  auth,
  handleUserProfile,
  signInWithGoogle,
} from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Shri Ratna Bhandar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      this.setState({
        errors: [err.message],
      });
      console.log(err);
    }
    // const user = await auth.
    // console.log(e);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar style={{ margin: "8px", backgroundColor: "#3f51b5" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <form
            className="formWrap"
            noValidate
            onSubmit={this.handleFormSubmit}
          >
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
            <Button className="social_btn" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>

            <FormInput
              label="Email"
              autoComplete="email"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              autoFocus
              required
            />
            <FormInput
              label="Password"
              autoComplete="password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              autoFocus
              required
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit">Log in</Button>

            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInWithFacebook}
            >
              Sign in with Facebook
            </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
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
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
