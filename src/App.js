// react libraries
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import Login from "./pages/Login";
import Home from "./pages/Homepage";

// components
import AdminToolbar from "./components/adminToolbar";

// Lauouts
import AdminPageLayout from "./layouts/AdminPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import LoginPageLayout from "./layouts/LoginPageLayout";
import ProductDetailPageLayout from "./layouts/ProductDetailPageLayout";

// redux
import { checkUserSession } from "./redux/user/user.actions";

//hoc (higher order components)
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// stylesheets
import "./App.scss";
const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Router>
      <AdminToolbar />
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
            <WithAdminAuth>
              <AdminPageLayout>
                <Admin />
              </AdminPageLayout>
            </WithAdminAuth>
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
