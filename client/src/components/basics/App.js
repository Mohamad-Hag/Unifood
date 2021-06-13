import React, { Component } from "react";
import "./styles/App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Entry from "../pages/Entry";
import Home from "../pages/Home";
import Restaurants from "../pages/Restaurants";
import Products from "../pages/Products";
import Header from "../fixtures/Header";
import MessageBox from "../alerts/MessageBox";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";

class App extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {};

    // Bindings Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentDidCatch() {}
  componentWillUnmount() {}
  render() {
    return (
      <div id="app-container">
        <Router>
          <Switch>
            <Route exact component path="/">
              <Home />
            </Route>
            <Route exact component path="/entry">
              <Entry />
            </Route>
            <Route exact component path="/restaurants">
              <Restaurants />
            </Route>
            <Route exact component path="/restaurants/name">
              <Products />
            </Route>
            <Route
              path="/restaurants/name/:id"
              render={(props) => <Product {...props} />}
            />
          </Switch>
          <Route exact component path="/profile">
            <Profile />
          </Route>
          <Route exact component path="/cart">
            <Cart />
          </Route>
        </Router>
      </div>
    );
  }
}
export default App;