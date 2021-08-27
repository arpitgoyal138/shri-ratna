import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { auth, signInWithGoogle } from "../../firebase/utils";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";
import AuthWrapper from "../authWrapper";

const initialState = {
  email: "",
  password: "",
  errors: [],
};

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
      <AuthWrapper headline="Login">
        <form onSubmit={this.handleFormSubmit}>
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
          <Button
            type="button"
            className="social_btn"
            onClick={signInWithGoogle}
          >
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
  }
}
