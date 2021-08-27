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
import React, { Component } from "react";
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

class App extends Component {
  changeNavBackground = () => {
    const { setChangeNavBG, changeNavBg } = this.props;

    if (window.scrollY >= window.innerHeight - 280) {
      if (!changeNavBg) setChangeNavBG(true);
    } else {
      if (changeNavBg) setChangeNavBG(false);
    }
  };

  authListener = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    window.addEventListener("scroll", this.changeNavBackground);
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ uid: snapshot.id, ...snapshot.data() });
        });
      }
      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.authListener();
  }
  render() {
    console.log("this.props:", this.props);
    const { currentUser } = this.props;
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
            render={(props) => (
              <ProductDetailPageLayout>
                <ProductDetail {...props} />
              </ProductDetailPageLayout>
            )}
          />
          <Route
            path="/admin"
            render={() =>
              !currentUser ? (
                <Redirect to="/login" />
              ) : (
                <AdminPageLayout>
                  <AdminHomepage />
                </AdminPageLayout>
              )
            }
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
  }
}

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
