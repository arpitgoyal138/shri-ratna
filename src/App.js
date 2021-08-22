import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import Admin from "./components/admin";
import ProductDetail from "./pages/productDetail";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Home /> */}
        <Route path="/admin" component={Admin} />
        <Route path="/products/:id" component={ProductDetail} />
        {/* <Admin /> */}
      </Switch>
    </Router>

    // <div className="App">
    //   <header className="App-header">

    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
