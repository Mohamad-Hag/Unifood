import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/HeaderMenu.css";
import LightLogo from "../../assets/vectors/LightLogo.svg";
import HeaderMenuLink from "../links/HeaderMenuLink";
import $ from "jquery";

class HeaderMenu extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {};

    // Bindings Methods
    this.closeMenuClicked = this.closeMenuClicked.bind(this);
    this.openMenuClicked = this.openMenuClicked.bind(this);
  }

  closeMenuClicked() {
    let menu = $("#header-menu");
    let menuContainer = $("#header-menu-container");
    menu.css("left", "-300px");
    menuContainer.fadeOut(200);
    $("body").css("overflow", "unset");
  }
  openMenuClicked() {
    let menu = $("#header-menu");
    let menuContainer = $("#header-menu-container");    
    menuContainer.fadeIn(200);
    setTimeout(() => {
        menu.css("left", "0");
    }, 1);
    $("body").css("overflow", "hidden");
  }

  componentDidMount() {
    let menuContainer = $("#header-menu-container");
    let menu = $("#header-menu");

    if (this.props.isOpen === "true") {
      menuContainer.show();
      menu.css("left", "0");
      $("body").css("overflow", "hidden");
    } else {
      menuContainer.hide();
      menu.css("left", "-300px");
      $("body").css("overflow", "unset");
    }
  }

  componentWillReceiveProps(newPro) {
    if (newPro.isOpen === "true") { 
      this.openMenuClicked();
    } else {
      this.closeMenuClicked();
    }
  }
  render() {
    return (
      <div ref={this.ref} id="header-menu-container">
        <div id="header-menu-opacity-box" onClick={this.closeMenuClicked}></div>
        <div id="header-menu">
          <div id="header-menu-title">
            <IconButton
              iconClass="fa fa-arrow-left"
              onClick={this.closeMenuClicked}
            />
            <a href="/">
              <img src={LightLogo} draggable="false" />
            </a>
          </div>
          <div id="header-menu-links">
            <HeaderMenuLink
              isActive="true"
              text="Home"
              iconClass="bi bi-house-fill"
              to="/"
            />
            <HeaderMenuLink
              text="Services"
              iconClass="bi bi-briefcase-fill"
              to="#"
            />
            <HeaderMenuLink
              text="About Unifood"
              iconClass="bi bi-info-square-fill"
              to="#"
            />
            <HeaderMenuLink
              text="Need Help"
              iconClass="bi bi-question-square-fill"
              to="#"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
