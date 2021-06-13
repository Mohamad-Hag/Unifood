import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/CartItemCard.css";
import Badges from "../labels/Badges";

class CartItemCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      counter: 1,
      id: 0,
    };

    // Binding Methods
    this.plusClicked = this.plusClicked.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.removeClicked = this.removeClicked.bind(this);
  }
  removeClicked() {
    let current = this.rootRef.current;
    let delay =
      parseFloat(
        getComputedStyle(current)
          .getPropertyValue("transition-duration")
          .slice(0, -1)
      ) * 1000;
    current.classList.add("cart-item-card-container-disappear");
    setTimeout(() => {
      this.props.onRemove(this.state.id);
      if (current) current.remove();
    }, delay);    
  }
  plusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".cart-item-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  minusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".cart-item-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  componentDidMount() {
    this.setState({ counter: this.props.count });
    this.setState({ id: this.props.itemId });
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="cart-item-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className="cart-item-card-details">
          <img
            className="cart-item-card-photo"
            alt=""
            src={this.props.photo}
            loading="lazy"
            draggable={false}
          />
          <p>{this.props.name}</p>
          {!this.props.isAvailable ? (
            <Badges
              text="not available"
              iconClass="bi bi-exclamation-diamond-fill"
              color="gray"
              background="rgb(204, 204, 204)"
            />
          ) : null}
        </div>
        <p className="cart-item-card-price-counter">
          {this.props.isAvailable ? <div className="cart-item-card-counter">
            <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
            <span className="customer-product-card-count">
              {this.state.counter}
            </span>
            <IconButton iconClass="fa fa-minus" onClick={this.minusClicked} />
          </div> : null}          
          <span className="cart-item-card-price">${this.props.price}</span>
          <div className="trash-sep"></div>
          <IconButton
            iconClass="bi bi-trash"
            tooltip="Remove"
            onClick={this.removeClicked}
          />
        </p>
      </div>
    );
  }
}

export default CartItemCard;
