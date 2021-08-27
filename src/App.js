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

const initialState = {
  currentUser: null,
  isOpen: false,
  changeNavBg: false,
  showMenu: true,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }
  changeNavBackground = () => {
    if (window.scrollY >= window.innerHeight - 280) {
      this.setState({
        changeNavBg: true,
      });
    } else {
      this.setState({
        changeNavBg: false,
      });
    }
  };
  toggleSidebar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  authListener = null;

  componentDidMount() {
    window.addEventListener("scroll", this.changeNavBackground);
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              uid: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        currentUser: null,
      });
    });
  }
  componentWillUnmount() {
    this.authListener();
  }
  render() {
    const { currentUser } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePageLayout
                {...this.state}
                // changeNavBg={CheckNavStyle.changeNavBg}
                // isOpen={CheckNavStyle.isOpen}
                // toggle={CheckNavStyle.toggle}
              >
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
                <LoginPageLayout
                  changeNavBg={false}
                  isOpen={false}
                  showMenu={false}
                >
                  <Login />
                </LoginPageLayout>
              )
            }
          />
          <Route
            path="/products/:id"
            render={() => (
              <ProductDetailPageLayout>
                <ProductDetail />
              </ProductDetailPageLayout>
            )}
          />
          <Route
            path="/admin"
            render={() =>
              !currentUser ? (
                <Redirect to="/login" />
              ) : (
                <AdminPageLayout
                  currentUser={currentUser}
                  changeNavBg={false}
                  isOpen={false}
                  showMenu={false}
                >
                  <AdminHomepage currentUser={currentUser} />
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
                <LoginPageLayout
                  changeNavBg={false}
                  isOpen={false}
                  showMenu={false}
                >
                  <Registration />
                </LoginPageLayout>
              )
            }
          />
          <Route
            path="/recovery"
            render={() => (
              <LoginPageLayout
                changeNavBg={false}
                isOpen={false}
                showMenu={false}
              >
                <Recovery />
              </LoginPageLayout>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
export default App;
