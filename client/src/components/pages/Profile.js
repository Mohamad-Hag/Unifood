import React, { Component } from "react";
import TabControl from "../panels/TabControl";
import "./styles/Profile.css";
import $ from "jquery";
import Header from "../fixtures/Header";
import Entry from "./Entry";
import Home from "./Home";
import Product from "./Product";
import Products from "./Products";
import CustomerReviewCard from "../cards/CustomerReviewCard";
import DefaultButton from "../inputs/DefaultButton";
import RecentOrders from "../fixtures/RecentOrders";
import FavoriteList from "../fixtures/FavoriteList";
import ProfileSettings from "../fixtures/ProfileSettings";
import p1 from "../../assets/images/Myphoto.jpg";
import Footer from "../fixtures/Footer";

class Profile extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
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
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="profile-container"
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
        <div id="profile-intro">
          <div id="profile-img-container">
            <img id="profile-img" src={p1} alt="" />
            <div id="profile-img-mask">
              <i className="bi bi-camera"></i>
            </div>
          </div>
          <div id="profile-basic-info">
            <p>Mohamad Hag</p>
            <span>mohamadhag99@gmail.com</span>
          </div>
        </div>
        <TabControl
          id="profile-tabs"
          tabs={[
            {
              text: "Recent Orders",
              iconClass: "bi bi-clock-history",
              isActive: true,
              content: (
                <RecentOrders
                  orders={[
                    {
                      date: "12 May 2021",
                      total: "50.5",
                    },
                    {
                      date: "12 May 2021",
                      total: "50.5",
                    },
                    {
                      date: "12 May 2021",
                      total: "50.5",
                    },
                    {
                      date: "12 May 2021",
                      total: "50.5",
                    },
                    {
                      date: "12 May 2021",
                      total: "50.5",
                    },
                  ]}
                />
              ),
            },
            {
              text: "Favorite List",
              iconClass: "bi bi-heart",
              content: <FavoriteList />,
            },
            {
              text: "Settings",
              iconClass: "bi bi-gear",
              content: <ProfileSettings />,
            }
          ]}
        />
        <Footer />
      </div>
    );
  }
}

export default Profile;
