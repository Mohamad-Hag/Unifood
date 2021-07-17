import React, { Component } from "react";
import "./styles/ManagerEnter.css";
import $ from "jquery";
import AOS from "aos";

import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import EntryHeader from "../fixtures/EntryHeader";

// Assets
import SignInManagerImg from "../../assets/vectors/SignInManager.svg";

class ManagerEnter extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      errors: {
        email: "",
        password: "",
      },
    };

    //Bindings Methods
    this.enterSubmitted = this.enterSubmitted.bind(this);
    this.emailFieldInputed = this.emailFieldInputed.bind(this);
    this.passwordFieldInputed = this.passwordFieldInputed.bind(this);
    this.enter = this.enter.bind(this);
  }

  // Triggered when email field text changed to a new value.
  emailFieldInputed(e) {
    let emailValue = e.currentTarget.value;
    let emailError = $("#email-error");
    let errors = this.state.errors;
    if (emailValue === "") {
      emailError.css("display", "flex").show();
      errors.email = "Email field can't be empty.";
      this.setState({ errors });
    } else {
      emailError.hide();
      errors.email = "";
      this.setState({ errors });
    }
  }

  // Triggered when password field text changed to a new value.
  passwordFieldInputed(e) {
    let passwordValue = e.currentTarget.value;
    let passwordError = $("#password-error");
    let errors = this.state.errors;
    if (passwordValue === "") {
      passwordError.css("display", "flex").show();
      errors.password = "Password field can't be empty.";
      this.setState({ errors });
    } else {
      passwordError.hide();
      errors.password = "";
      this.setState({ errors });
    }
  }

  // Triggered when customer enter form submitted.
  enterSubmitted(e) {
    e.preventDefault();
    let emailField = $("#email-in");
    let passwordField = $("#password-in");
    let emailValue = emailField.val();
    let passwordValue = passwordField.val();
    let emailError = $("#email-error");
    let passwordError = $("#password-error");
    let errors = this.state.errors;

    if (emailValue === "") {
      emailError.fadeIn(0);
      errors.email = "Email field can't be empty.";
      this.setState({ errors });
    }
    if (passwordValue === "") {
      passwordError.fadeIn(0);
      errors.password = "Password field can't be empty.";
      this.setState({ errors });
    } else if (passwordValue !== "" && emailValue !== "") {
      this.enter(emailValue, passwordValue);
    }
  }

  // Tries to enter to a manager account using his id number and password.
  enter(email, password) {
    // Sendeing a request using axios to the server api goes here...
  }

  // Component created for the first time.
  componentDidMount() {
    AOS.init();
    $("input[type='email']")[0].focus();
  }

  // Component rendered as result of (updating, creating, etc.)
  render() {
    return (
      <div
        id="customer-enter-container"
        data-aos="fade"
        data-aos-duration="1000"
        ref={this.ref}
      >
        <EntryHeader
          buttonText="Contact Us"
          caption="You're not a subscriber of unifood service?"
          buttonOnClick={() => {
            window.location.href = "/help";
          }}
        />
        <div id="form-container">
          <div id="form-intro">
            <h1>Welcome Again!</h1>
            <img src={SignInManagerImg} draggable="false" />
          </div>
          <form id="form" onSubmit={this.enterSubmitted} noValidate>
            <TextBox
              inputId="email-in"
              errorId="email-error"
              placeholder="Email"
              type="email"
              onInput={this.emailFieldInputed}
              error={this.state.errors.email}
            />
            <PasswordBox
              inputId="password-in"
              errorId="password-error"
              placeholder="Password"
              onInput={this.passwordFieldInputed}
              error={this.state.errors.password}
            />
            <DefaultButton
              text="Enter&nbsp;&nbsp;&nbsp;"
              inputType="submit"
              iconClass="fa fa-arrow-right"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ManagerEnter;
