import React, { Component } from "react";
import Header from "../fixtures/Header";
import "./styles/Restaurants.css";
import $ from "jquery";
import ItemsSidebar from "../sidebars/ItemsSidebar";
import CategoryCard from "../cards/CategoryCard";
import Photo from "../../assets/images/Myphoto.jpg";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";
import Footer from "../fixtures/Footer";
import IconButton from "../inputs/IconButton";

class Restaurants extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      categories: [],
      products: [],
      expandMenuIcon: "fa fa-chevron-up",
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getchangeSelectedItemToIntersected =
      this.changeSelectedItemToIntersected.bind(this);
    this.expandMenuClicked = this.expandMenuClicked.bind(this);
  }
  expandMenuClicked()
  {
    let menu = document.querySelector("#categories-sidebar");
    if (this.state.expandMenuIcon.includes("up")) this.setState({expandMenuIcon: "fa fa-chevron-down"});
    else this.setState({ expandMenuIcon: "fa fa-chevron-up" });
    menu.classList.toggle("categories-sidebar-open");
  }
  searchClicked() {
    $("#customer-search-container").slideDown(150);
    $("#customer-search-in").focus();
    $("body").css("overflow-y", "hidden");
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  getProducts() {
    Axios.get("https://fakestoreapi.com/products").then((response) => {
      let data = response.data;
      this.setState({ products: data });
    });
  }
  getCategories() {
    Axios.get("https://fakestoreapi.com/products/categories").then(
      (response) => {
        let data = response.data;
        let newData = [];
        data.forEach((element, i) => {
          newData.push({
            text: data[i],
            to: `#category${i}`,
            isActive: i === 0 ? "true" : "false",
          });          
        });
        this.setState({ categories: newData }, () => {
          document.querySelector("#restaurants-loader").style.display = "none";
        });
      }
    );
  }
  getNotifications() {
    let notifications = [];
    let pro = new Promise((resolve) => {
      for (let i = 0; i < 10; i++) {
        notifications.push({
          from: "Deep House",
          description: "You're order confirmed successfully.",
          time: "5 min ago",
          isRead: "false",
          markAsReadOnClick: this.notificationMarkAsReadClicked,
        });
      }
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
  changeSelectedItemToIntersected() {
    setTimeout(() => {
      let options = {
        root: document.querySelector("#restaurants-categories-container"),
        rootMargin: "0px",
        threshold: 1.0,
      };
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let newCategories = this.state.categories.map((element, i) => {
              let isActive;
              if (element.to === "#" + entry.target.getAttribute("id"))
                isActive = "true";
              else isActive = "false";
              return {
                text: element.text,
                to: element.to,
                isActive: isActive,
              };
            });
            this.setState({ categories: newCategories });
          }
        });
      }, options);
      document.querySelectorAll(".restaurant-name").forEach((element) => {
        observer.observe(element);
      });
    }, 1000);
  }
  componentDidMount() {
    this.setState({ cartCount: "1", notificationsCount: "2" });
    this.getCategories();
    this.getProducts();
    this.changeSelectedItemToIntersected();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps() {}
  render() {
    return (
      <div
        className={this.props.className}
        id="restaurants-container"
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
        <main id="restaurants-main">
          <div id="restaurants-loader">
            <CircleLoader isActive="true" />
          </div>
          <ItemsSidebar id="categories-sidebar" items={this.state.categories} />
          <div id="restaurants-categories-outer">
            <div id="restaurants-categories-container">
              {this.state.categories.map((category, i) => {
                return (
                  <div className="resturant-categories">
                    <h1 id={`category${i}`} className="restaurant-name">
                      {category.text}
                    </h1>
                    <div className="resturant-categories-inner">
                      {this.state.products.filter((element) => element.category === category.text).map((prodcut) => {
                        return (
                          <CategoryCard
                            photo={prodcut.image}
                            category={prodcut.title}
                            description={prodcut.description}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <IconButton
          id="expand-menu"
          iconClass={this.state.expandMenuIcon}
          onClick={this.expandMenuClicked}
        />
      </div>
    );
  }
}

export default Restaurants;
