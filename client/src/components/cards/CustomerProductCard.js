import React, { Component } from "react";
import DefaultButton from "../inputs/DefaultButton";
import IconButton from "../inputs/IconButton";
import Badges from "../labels/Badges";
import CircleLoader from "../loaders/CircleLoader";
import "./styles/CustomerProductCard.css";
import AOS from "aos";

class CustomerProductCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      counter: props.counter ? props.counter : 1,
      isFavorite: props.isFavorite,
      cartButton: {
        text: (
          <span style={{ color: "var(--secondry-text-color)" }}>
            Add To Cart&nbsp;&nbsp;&nbsp;
          </span>
        ),
        icon: "bi bi-cart-plus",
      },
    };

    // Binding Methods
    this.addToFavorites = this.addToFavorites.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.plusClicked = this.plusClicked.bind(this);
    this.photoLoaded = this.photoLoaded.bind(this);
    this.viewDetailsClicked = this.viewDetailsClicked.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
  }
  addToCartClicked(e) {
    if (!this.props.isAvailable) return;
    let target = e.currentTarget;
    target.classList.toggle("remove-from-cart-btn");
    let oldIcon = this.state.cartButton.icon;
    let iconClass = "bi bi-cart-plus";
    let text =
      oldIcon === iconClass ? (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Remove From Cart&nbsp;&nbsp;&nbsp;
        </span>
      ) : (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Add To Cart&nbsp;&nbsp;&nbsp;
        </span>
      );
    let icon = oldIcon === iconClass ? "bi bi-cart-dash" : iconClass;
    this.setState({
      cartButton: {
        text: text,
        icon: icon,
      },
    });
    let productAdded = oldIcon === iconClass ? true : false;
    if (this.props.onProductAdd)
      this.props.onProductAdd(this.props.id, productAdded);
  }
  viewDetailsClicked() {
    window.location.href = `/restaurants/name/${this.props.id}`;
  }
  photoLoaded(e) {
    let target = e.currentTarget;
    let loader = target.parentElement.children[1];
    if (loader) loader.remove();
  }
  addToFavorites() {
    this.setState({ isFavorite: !this.state.isFavorite });
  }
  minusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  plusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  componentDidMount() {
    AOS.init();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {
    this.setState({
      isFavorite: newPro.isFavorite,
      counter: newPro.counter ? newPro.counter : this.state.counter,
    });
  }
  render() {
    return (
      <div
        className="customer-product-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        data-aos="fade-up"
        data-aos-once="true"
      >
        <div className="cutsomer-product-card-top">
          <div
            className="cutsomer-product-card-img-container"
            onClick={this.viewDetailsClicked}
          >
            <img
              src={this.props.photo}
              loading="lazy"
              onLoad={this.photoLoaded}
            />
            <div className="cutsomer-product-card-img-loader">
              <CircleLoader isActive="true" />
            </div>
          </div>
          <div className="customer-product-card-detail-1">
            <p onClick={this.viewDetailsClicked}>{this.props.name}</p>
            <span>{this.props.price}</span>
          </div>
          {this.props.hasTags ? (
            <div className="customer-product-card-tags">
              {this.props.isNew ? (
                <Badges text="new" background="var(--error-color)" />
              ) : null}
              {this.props.isOffer ? (
                <Badges
                  text="offer"
                  background="var(--info-color)"
                  tooltip={this.props.offerTooltip}
                />
              ) : null}
              {!this.props.isAvailable ? (
                <Badges
                  iconClass="bi bi-exclamation-diamond-fill"
                  text="not available"
                  color="gray"
                  background="#ccc"
                />
              ) : null}
            </div>
          ) : null}
          <div className="customer-product-card-rate">
            {["", "", "", "", ""].map((star, i) => {
              let editedStar = <i className="bi bi-star"></i>;
              if (i < this.props.rating)
                editedStar = <i className="bi bi-star-fill"></i>;
              return editedStar;
            })}
          </div>
          {this.props.description !== undefined ? (
            <div className="customer-product-card-detail-2">
              {this.props.description}
            </div>
          ) : null}
        </div>
        <div className="cutsomer-product-card-bottom">
          <div className="customer-product-card-controls">
            <div className="customer-product-card-counter">
              <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
              <span className="customer-product-card-count">
                {this.state.counter}
              </span>
              <IconButton iconClass="fa fa-minus" onClick={this.minusClicked} />
            </div>
            <IconButton
              tooltip={this.state.isFavorite ? "Unfavorite" : "Favorite"}
              id="customer-product-card-add-to-favorites"
              onClick={this.addToFavorites}
              iconClass={
                this.state.isFavorite ? "fa fa-heart" : "fa fa-heart-o"
              }
            />
          </div>
          <DefaultButton
            onClick={this.addToCartClicked}
            text={this.state.cartButton.text}
            iconClass={this.state.cartButton.icon}
            disabled={this.props.isAvailable === false ? true : false}
          />
          <DefaultButton
            onClick={this.viewDetailsClicked}
            text="View Details&nbsp;&nbsp;&nbsp;"
            iconClass="bi bi-box-arrow-up-right"
            type="outline"
          />
        </div>
      </div>
    );
  }
}

export default CustomerProductCard;
