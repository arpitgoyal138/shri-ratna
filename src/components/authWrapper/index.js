import React from "react";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import "./../../assets/css/custom.scss";
const AuthWrapper = ({ headline, children }) => {
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
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar style={{ margin: "8px", backgroundColor: "rgb(63 81 100)" }}>
          <LockOutlinedIcon />
        </Avatar>
        {headline && (
          <Typography component="h1" variant="h5">
            {headline}
          </Typography>
        )}
        {children && <div className="children">{children}</div>}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AuthWrapper;
