import React, { Component } from "react";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../authWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./../../assets/css/custom.scss";

const initialState = {
  email: "",
  errors: [],
  success: [],
};

export default class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const config = {
      url: "http://localhost:3000/login",
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log("Link sent");
          this.setState({
            email: "",
            errors: [],
            success: ["Link sent to email"],
          });
        })
        .catch((err) => {
          this.setState({
            errors: ["Email not found. Please try again."],
            success: [],
          });
          console.log("err", err.message);
        });
    } catch (err) {
      this.setState({
        errors: [err.message],
        success: [],
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
    const { email, errors, success } = this.state;

    return (
      <AuthWrapper headline="Reset Password">
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
          {success.length > 0 && (
            <ul>
              {success.map((msg, index) => {
                return (
                  <li className="success_list" key={index}>
                    {msg}
                  </li>
                );
              })}
            </ul>
          )}
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

          <Button type="submit">Send Link</Button>
          {/* <Grid container>
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
            </Grid> */}
        </form>
      </AuthWrapper>
    );
  }
}
