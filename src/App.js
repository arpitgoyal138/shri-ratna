// react libraries
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Pages
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import Login from "./pages/Login";
import Home from "./pages/Homepage";
import Categories from "./pages/Categories";

// components
import AdminToolbar from "./components/adminToolbar";

// Layouts
import AdminPageLayout from "./layouts/AdminPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import LoginPageLayout from "./layouts/LoginPageLayout";

// redux
import { checkUserSession } from "./redux/user/user.actions";

//hoc (higher order components)
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// stylesheets
import "./App.scss";
import "./assets/css/_globals.scss";
import "./assets/css/custom.scss";

// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import ProductResults from "./components/productResults";

const mapState = ({ user }) => ({
  loading: user.loading,
});
const App = (props) => {
  const { loading } = useSelector(mapState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Router>
      <AdminToolbar />
      {loading && (
        <div className="loader-container">
          <CircularProgress className="loader" />
        </div>
      )}
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
          path="/products"
          exact
          render={() => (
            <HomePageLayout>
              <ProductResults />
            </HomePageLayout>
          )}
        />
        {/* <Route
          path="/products/:filterType"
          render={() => (
            <HomePageLayout>
              <ProductResults {...props} />
            </HomePageLayout>
          )}
        /> */}
        <Route
          path="/products/:productID"
          render={() => (
            <HomePageLayout>
              <ProductDetails {...props} />
            </HomePageLayout>
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
          path="/categories"
          render={() => (
            <WithAdminAuth>
              <AdminPageLayout>
                <Categories />
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
