import React, { Component } from "react";
import Header from "../fixtures/Header";
import "./styles/Products.css";
import $ from "jquery";
import p1 from "../../assets/images/size_800_product_image.jpg";
import p2 from "../../assets/images/deephouse.jpg";
import CustomerProductCard from "../cards/CustomerProductCard";
import Footer from "../fixtures/Footer";
import SelectBox from "../inputs/SelectBox";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";

class Products extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    this.id = 0;

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      products: [],
      categories: ["All"],
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.filterSelected = this.filterSelected.bind(this);
    this.productAdded = this.productAdded.bind(this);
  }
  productAdded(id, added) {
    let count = this.state.cartCount;
    count = added ? (count + 1) : (count - 1);
    this.setState({ cartCount: count });
  }
  categorySelected(value) {
    let loader = document.querySelector("#products-loader");
    loader.style.display = "flex";
    Axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=i").then(
      (response) => {
        let data =
          value === "All"
            ? response.data.meals
            : response.data.meals.filter((element) => element.strCategory === value);
        this.setState(
          {
            products: data,
          },
          () => {
            loader.style.display = "none";
          }
        );
      }
    );
  }
  filterSelected(value) {}
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
  getProducts() {
    Axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=i").then(
      (response) => {
        let data = response.data.meals;       
        console.log(data); 
        this.setState({ products: data }, () => {
          let loader = document.querySelector("#products-loader");
          if (loader) loader.style.display = "none";
        });
      }
    );
  }
  getCategories() {
    Axios.get("https://www.themealdb.com/api/json/v1/1/categories.php").then(
      (response) => {
        let data = response.data.categories.map((d) => {
          return d.strCategory;
        });        
        this.setState({ categories: [this.state.categories, ...data] });
      }
    );
  }
  componentDidMount() {
    this.setState({ cartCount: 1, notificationsCount: 2 });
    this.getProducts();
    this.getCategories();
    this.id = this.props.id;
  }
  componentDidUpdate() {}

  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="products-container"
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
        />
        <div id="prodcuts-header">
          <div id="product-header-left">
            <img id="restaurant-img" src={p2} />
            Deep House
          </div>
          <div id="product-header-right">
            <SelectBox
              items={this.state.categories}
              selectedIndex="0"
              placeholder="Category"
              onValueSelected={this.categorySelected}
            />
            <SelectBox
              items={["None", "Top Rated", "Newest", "Available Only"]}
              selectedIndex="0"
              placeholder="Filter By"
              onValueSelected={this.filterSelected}
            />
          </div>
        </div>
        <main id="products-main">
          {this.state.products.map((product, i) => {
            return (
              <CustomerProductCard
                id={product.idMeal}
                isFavorite={false}
                name={product.strMeal}
                price="$40.3"
                description={product.strInstructions.slice(0, 200)}
                photo={product.strMealThumb}
                onProductAdd={this.productAdded}
                hasTags={true}
                isOffer={i % 2 === 0 ? true : false}
                isNew={true}
                isAvailable={i % 2 === 0 ? true : false}
                rating={3}
                offerTooltip="50% Off!"
              />
            );
          })}
        </main>
        <Footer />
        <div id="products-loader">
          <CircleLoader isActive="true" />
        </div>
      </div>
    );
  }
}

export default Products;
