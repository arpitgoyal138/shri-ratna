import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import { auth, handleUserProfile } from "./firebase/utils";
import React, { useEffect } from "react";
import AdminHomepage from "./pages/Admin/Home";
import Home from "./pages/Homepage";
import AdminPageLayout from "./layouts/AdminPageLayout";
import HomePageLayout from "./layouts/HomePageLayout";
import LoginPageLayout from "./layouts/LoginPageLayout";
import ProductDetailPageLayout from "./layouts/ProductDetailPageLayout";
import Registration from "./pages/Registration";
import Recovery from "./pages/Recovery";
import { setCurrentUserAction } from "./redux/user/user.actions";

import { connect } from "react-redux";
import {
  setChangeBackgroundAction,
  setIsMenuOpenAction,
  setShowMenuAction,
} from "./redux/navbar/navbar.actions";
import WithAuth from "./hoc/withAuth";

const App = (props) => {
  console.log("App props:", props);

  const { setCurrentUser, currentUser, setChangeNavBG, changeNavBg } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ uid: snapshot.id, ...snapshot.data() });
        });
      }
      setCurrentUser(userAuth);
    });
    return () => {
      authListener();
    };
  }, []);

  const changeNavBackground = () => {
    if (window.scrollY >= window.innerHeight - 280) {
      if (!changeNavBg) setChangeNavBG(true);
    } else {
      if (changeNavBg) setChangeNavBG(false);
    }
  };
  window.addEventListener("scroll", changeNavBackground);

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
          render={() =>
            currentUser ? (
              <Redirect to="/admin" />
            ) : (
              <LoginPageLayout>
                <Login />
              </LoginPageLayout>
            )
          }
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
          render={() =>
            currentUser ? (
              <Redirect to="/admin" />
            ) : (
              <LoginPageLayout>
                <Registration />
              </LoginPageLayout>
            )
          }
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

const mapStateToProps = ({ user, navbar }) => ({
  currentUser: user.currentUser,
  changeNavBg: navbar.changeNavBg,
  isMenuOpen: navbar.isMenuOpen,
  showMenu: navbar.showMenu,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
  setChangeNavBG: (navbar) => dispatch(setChangeBackgroundAction(navbar)),
  setIsMenuOpen: (navbar) => dispatch(setIsMenuOpenAction(navbar)),
  setShowMenu: (navbar) => dispatch(setShowMenuAction(navbar)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
