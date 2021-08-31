import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import AdminHomepage from "./pages/Admin/Home";
import Home from "./pages/Homepage";
import AdminPageLayout from "./layouts/AdminPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import LoginPageLayout from "./layouts/LoginPageLayout";
import ProductDetailPageLayout from "./layouts/ProductDetailPageLayout";
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import { checkUserSession } from "./redux/user/user.actions";

import WithAuth from "./hoc/withAuth";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomePageLayout>
              <Home />
            </HomePageLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <LoginPageLayout>
              <Login />
            </LoginPageLayout>
          )}
        />
        <Route
          path="/products/:id"
          render={() => (
            <ProductDetailPageLayout>
              <ProductDetail {...props} />
            </ProductDetailPageLayout>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAuth>
              <AdminPageLayout>
                <AdminHomepage />
              </AdminPageLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <LoginPageLayout>
              <Registration />
            </LoginPageLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <LoginPageLayout>
              <Recovery />
            </LoginPageLayout>
          )}
        />
      </Switch>
    </Router>
  );
};
export default App;
