import React, { Component } from "react";
import "./styles/Cart.css";
import $ from "jquery";
import Header from "../fixtures/Header";
import Footer from "../fixtures/Footer";
import CartItemCard from "../cards/CartItemCard";
import p1 from "../../assets/images/size_800_product_image.jpg";
import DefaultButton from "../inputs/DefaultButton";
import MessageBox from "../alerts/MessageBox";
import Axios from "axios";
import NoItemsImg from "../../assets/vectors/NoResults.svg";
import CircleLoader from "../loaders/CircleLoader";
import ReactDOM from "react-dom";

class Cart extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      isCartMessageBoxOpen: "false",
      messageBoxTitle: "Cart checkout",
      messageBoxDescription: "Do you want really to checkout your cart?",
      messageBoxControls: "yes-no",
      messageBoxType: "warning",
      messageBoxOnValueSelected: (value) => {
        this.valueSelected(value);
      },
      items: [],
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.checkoutClicked = this.checkoutClicked.bind(this);
    this.continueClicked = this.continueClicked.bind(this);
    this.valueSelected = this.valueSelected.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.itemRemoved = this.itemRemoved.bind(this);
  }
  itemRemoved(id) {
    let newItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: newItems, isCartMessageBoxOpen: "false" });
  }
  getCartItems() {
    Axios.get("https://api.jsonbin.io/v3/b/60b9f2e292164b68bebfbb57/2", {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2b$10$Njyi7uTHU4UxNDG.9P0KHOw9ejrVPQXSM0ffpgcftLACCV5HYdKs2",
      },
    }).then((response) => {
      let data = response.data.record;
      this.setState({ items: data }, () => {
        let loading = document.querySelector("#cart-table-body-loading");
        if (loading) loading.remove();
      });
    });
  }
  valueSelected(value) {
    if (value === "Yes") {
      this.setState({ isCartMessageBoxOpen: "false" });
      setTimeout(() => {
        this.setState({
          messageBoxTitle: "Success",
          messageBoxType: "success",
          messageBoxDescription: "Your cart is successfully checked out.",
          messageBoxControls: "none",
          messageBoxOnValueSelected: undefined,
          isCartMessageBoxOpen: "true",
        });
      }, 1000);
    } else {
      this.setState({ isCartMessageBoxOpen: "false" });
    }
  }
  continueClicked() {}
  checkoutClicked() {
    this.setState({ isCartMessageBoxOpen: "true" });
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  getNotifications() {
    let notifications = [];
    let pro = new Promise((resolve) => {
      resolve(notifications);
    });
    return pro;
  }
  notificationsClicked() {
    this.setState({ notificationsCount: null });
    this.setState((pre) => ({
      isNotificationsOpen:
        pre.isNotificationsOpen === "false" ? "true" : "false",
    }));
  }
  searchClicked() {
    $("#customer-search-container").slideDown(150);
    $("#customer-search-in").focus();
    $("body").css("overflow-y", "hidden");
  }
  componentDidMount() {
    this.getCartItems();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="cart-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <Header
          onNotificationsClose={this.notificationsClosed}
          notificationsCount={this.state.notificationsCount}
          cartCount={this.state.cartCount}
          isNotificationsOpen={this.state.isNotificationsOpen}
          notificationsOnClick={this.notificationsClicked}
          notificationsHandler={this.getNotifications}
          searchOnClick={this.searchClicked}
          profileLink="/profile"
        />
        <p id="cart-title">
          <div>
            <i className="bi bi-cart4"></i>Cart
          </div>
          <div>
            <i className="bi bi-list-nested"></i>
            {this.state.items.length} Items
          </div>
        </p>
        <div id="cart-inner">
          <div id="cart-table-body">
            {this.state.items.length !== 0 ? (
              this.state.items.map((item) => {
                return (
                  <CartItemCard
                    itemId={item.id}
                    key={item.id}
                    photo={item.photo}
                    name={item.name}
                    price={item.price}
                    count={item.count}
                    onRemove={this.itemRemoved}
                    isAvailable={item.isAvailable}
                  />
                );
              })
            ) : (
              <div id="no-cart-items">
                <p>There is no cart items here...</p>
                <img alt="" src={NoItemsImg} draggable={false} />
              </div>
            )}
            <div id="cart-table-body-loading">
              <CircleLoader isActive="true" />
            </div>
          </div>
          <div id="cart-summary">
            {this.state.items.length !== 0 ? (
              <p>
                Total Price: <span>$1883.82</span>
              </p>
            ) : null}
            <div id="cart-controls">
              <DefaultButton
                text="Continue Shopping"
                type="outline"
                onClick={this.continueClicked}
              />
              {this.state.items.length !== 0 ? (
                <DefaultButton text="Checkout" onClick={this.checkoutClicked} />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
        <MessageBox
          title={this.state.messageBoxTitle}
          description={this.state.messageBoxDescription}
          type={this.state.messageBoxType}
          controls={this.state.messageBoxControls}
          onValueSelected={this.state.messageBoxOnValueSelected}
          isOpen={this.state.isCartMessageBoxOpen}
        />
      </div>
    );
  }
}

export default Cart;
