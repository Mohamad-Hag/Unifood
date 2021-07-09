import React, { Component } from "react";
import "./styles/Product.css";
import $ from "jquery";
import Header from "../fixtures/Header";
import Axios from "axios";
import p2 from "../../assets/images/deephouse.jpg";
import p1 from "../../assets/images/Myphoto.jpg";
import Footer from "../fixtures/Footer";
import Badges from "../labels/Badges";
import IconButton from "../inputs/IconButton";
import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import CustomerReviewCard from "../cards/CustomerReviewCard";
import getIndexOfElement from "../assitance-methods/getIndexOfElement";
import CircleLoader from "../loaders/CircleLoader";

class Product extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      from: "Deep House",
      name: <CircleLoader isActive="true" size="small" />,
      price: "0.00",
      description: <CircleLoader isActive="true" />,
      isAddedToCart: false,
      isFavorite: false,
      isRated: false,
      rating: 1,
      counter: 1,
      hasTags: true,
      isNew: false,
      isOffer: false,
      offerTooltip: undefined,
      isAvailable: true,
      image: null,
      cartButton: {
        text: (
          <span style={{ color: "var(--secondry-text-color)" }}>
            Add To Cart&nbsp;&nbsp;&nbsp;
          </span>
        ),
        icon: "bi bi-cart-plus",
      },
      reviews: [],
      reviewsLoading: "true",
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.plusClicked = this.plusClicked.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
    this.rateThisClicked = this.rateThisClicked.bind(this);
    this.starClicked = this.starClicked.bind(this);
    this.closeRating = this.closeRating.bind(this);
    this.submitRatingClicked = this.submitRatingClicked.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.insertClicked = this.insertClicked.bind(this);
    this.addReviewKeyUpped = this.addReviewKeyUpped.bind(this);
  }
  addReviewKeyUpped(e) {
    if (e.keyCode === 13) this.insertClicked();
  }
  insertClicked() {
    let textbox = document.querySelector("#add-review-tbx");
    let text = textbox.value;
    if (text === "") return;
    textbox.value = "";
    this.setState({
      reviews: [
        {
          postId: 1,
          id: 2,
          name: "Mohamad Hag",
          email: "Jayne_Kuhic@sydney.com",
          body: text,
        },
        ...this.state.reviews,
      ],
    });
  }
  getReviews() {
    Axios.get("https://jsonplaceholder.typicode.com/comments").then(
      (response) => {
        let data = response.data.slice(0, 10);
        console.log(data);
        this.setState({ reviews: data }, () => {
          this.setState({ reviewsLoading: "false" });
        });
      }
    );
  }
  submitRatingClicked() {
    let dial = document.querySelector("#rating-dial");
    dial.innerHTML =
      "<div class='thanks-rating'>Thanks for rating! <i class='fa fa-check'></i><div>";
    setTimeout(() => {
      this.closeRating();
    }, 1500);
  }
  starClicked(e) {
    let target = e.currentTarget;
    let stars = document.querySelector("#rating-dial-stars");
    let star = document.querySelectorAll("#rating-dial-stars i");
    let index = getIndexOfElement(target, "bi", stars);
    let caption = document.querySelector("#rating-dial-caption");
    let captions = [
      "Never try this 😔",
      "It has chance to try 😐",
      "Good product 🙂",
      "Excellent product 😄",
      "I extremly recommend this 😍",
    ];
    caption.innerText = captions[index];
    for (let i = 0; i < 5; i++) {
      if (i <= index) star[i].setAttribute("class", "bi bi-star-fill");
      else star[i].setAttribute("class", "bi bi-star");
    }
  }
  closeRating() {
    let box = document.querySelector("#rating-dial-container");
    box.style.display = "none";
  }
  addToCartClicked(e) {
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

    let added = oldIcon === iconClass ? true : false;
    let count = this.state.cartCount;
    count = added ? count + 1 : count - 1;
    this.setState({ cartCount: count });
  }
  rateThisClicked() {
    let box = document.querySelector("#rating-dial-container");
    box.style.display = "block";
  }
  addToFavorites() {
    this.setState({ isFavorite: !this.state.isFavorite });
  }
  minusClicked(e) {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  plusClicked(e) {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
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
    this.setState({ cartCount: 1, notificationsCount: 2 });
    this.getReviews();

    let params = this.props.match.params;
    let id = params.id;
    Axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((response) => {
      let data = response.data.meals[0];
      this.setState({
        from: "Deep House",
        name: data.strMeal,
        price: "40.5",
        description: data.strInstructions,
        isAddedToCart: false,
        isFavorite: false,
        isRated: false,
        rating: 3,
        counter: 1,
        hasTags: true,
        isNew: true,
        isOffer: true,
        offerTooltip: "50% Off!",
        isAvailable: true,
        image: data.strMealThumb,
      });
    });
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="product-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      >
        <Header
          onNotificationsClose={this.notificationsClosed}
          notificationsCount={this.state.notificationsCount}
          cartCount={this.state.cartCount}
          isNotificationsOpen={this.state.isNotificationsOpen}
          notificationsOnClick={this.notificationsClicked}
          notificationsHandler={this.getNotifications}
          searchOnClick={this.searchClicked}
          profilePhoto={p1}
          profileLink="/profile"
        />

        <div id="product-header">
          <img id="restaurant-img" src={p2} />
          {this.state.from}
        </div>
        <div
          style={{ backgroundImage: `url(${this.state.image})` }}
          id="product-intro"
        >
          <div id="product-intro-inner">
            <div id="product-top">
              <div id="product-detail-1">
                <p>{this.state.name}</p>
                <span>${this.state.price}</span>
              </div>
              <div id="product-detail-2">
                {this.state.hasTags ? (
                  <div id="product-tags">
                    {this.state.isNew ? (
                      <Badges text="new" background="var(--error-color)" />
                    ) : null}
                    {this.state.isOffer ? (
                      <Badges
                        text="offer"
                        background="var(--info-color)"
                        tooltip={this.state.offerTooltip}
                      />
                    ) : null}
                    {!this.state.isAvailable ? (
                      <Badges
                        iconClass="bi bi-exclamation-diamond-fill"
                        text="not available"
                        color="gray"
                        background="#ccc"
                      />
                    ) : null}
                  </div>
                ) : null}
                <div id="product-rating">
                  {["", "", "", "", ""].map((star, i) => {
                    let editedStar = <i className="bi bi-star"></i>;
                    if (i < this.state.rating)
                      editedStar = <i className="bi bi-star-fill"></i>;
                    return editedStar;
                  })}
                </div>
              </div>
              {this.state.description ? (
                <div id="product-detail-3">{this.state.description}</div>
              ) : null}
            </div>
            <div id="product-bottom">
              <div className="product-counter">
                <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
                <span className="product-count">{this.state.counter}</span>
                <IconButton
                  iconClass="fa fa-minus"
                  onClick={this.minusClicked}
                />
              </div>
              <div id="product-controls">
                {!this.state.isAvailable ? null : (
                  <IconButton
                    tooltip={this.state.isFavorite ? "Unfavorite" : "Favorite"}
                    id="customer-product-card-add-to-favorites"
                    onClick={this.addToFavorites}
                    iconClass={
                      this.state.isFavorite ? "fa fa-heart" : "fa fa-heart-o"
                    }
                  />
                )}
                <DefaultButton
                  onClick={this.addToCartClicked}
                  text={this.state.cartButton.text}
                  iconClass={this.state.cartButton.icon}
                  disabled={this.state.isAvailable === false ? true : false}
                />
                <DefaultButton
                  id="product-rate-btn"
                  onClick={this.rateThisClicked}
                  text="Rate This&nbsp;&nbsp;&nbsp;"
                  iconClass="bi bi-hand-thumbs-up"
                  type="outline"
                />
              </div>
            </div>
          </div>
        </div>
        <section id="reviews-section">
          <div id="reviews-header">
            <p id="reviews-title">
              Reviews ({this.state.reviews.length}){" "}
              <CircleLoader isActive={this.state.reviewsLoading} size="small" />
            </p>
            <div id="add-comment-section">
              <TextBox
                onKeyUp={this.addReviewKeyUpped}
                inputId="add-review-tbx"
                placeholder="Add a review..."
                autoComplete="off"
              />
              <DefaultButton text="Insert" onClick={this.insertClicked} />
            </div>
          </div>
          <div id="reviews-container">
            {this.state.reviews.map((review) => {
              return (
                <CustomerReviewCard
                  name={review.name}
                  review={review.body}
                  time="5 hours ago."
                  profileLink="#"
                  likes="50"
                  dislikes="70"
                  userId={review.postId}
                  reviewId={review.id}
                  photo={p1}
                />
              );
            })}
          </div>
        </section>
        <div id="rating-dial-container">
          <div id="rating-dial-opacity-box" onClick={this.closeRating}></div>
          <div id="rating-dial">
            <div id="rating-dial-stars">
              <i className="bi bi-star-fill" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
            </div>
            <p id="rating-dial-caption">Never try this 😔</p>
            <DefaultButton text="Submit" onClick={this.submitRatingClicked} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Product;
