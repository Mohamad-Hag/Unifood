import React, { Component } from "react";
import "./styles/CustomerRegister.css";
import $ from "jquery";
import AOS from "aos";
import ReactDOM from "react-dom";

import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import EntryHeader from "../fixtures/EntryHeader";
import CustomerEnter from "./CustomerEnter";

// Assets
import SignInCustomerImg from "../../assets/vectors/SignInCustomer.svg";
import SearchSelectPopup from "../popups/SearchSelectPopup";

class CustomerRegister extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {
      errors: {
        name: "",
        id: "",
        password: "",
        general: "",
      },      
    };

    //Bindings Methods
    this.goToCustomerEnter = this.goToCustomerEnter.bind(this);
    this.idFieldInputed = this.idFieldInputed.bind(this);
    this.nameFieldInputed = this.nameFieldInputed.bind(this);
    this.passwordFieldInputed = this.passwordFieldInputed.bind(this);
    this.registerSubmitted = this.registerSubmitted.bind(this);
  }

  // Triggered when form is submitted.
  registerSubmitted(e) {
    e.preventDefault();
    let nameField = $("#name-in");
    let idField = $("#id-in");
    let passwordField = $("#password-in");
    let nameValue = nameField.val();
    let idValue = idField.val();
    let passwordValue = passwordField.val();
    let nameError = $("#name-error");
    let idError = $("#id-error");
    let passwordError = $("#password-error");
    let errors = this.state.errors;

    if (idValue === "") {
      idError.css("display", "flex").show();
      errors.id = "ID number field can't be empty.";
      this.setState({ errors });
    }
    if (passwordValue === "") {
      passwordError.css("display", "flex").show();
      errors.password = "Password field can't be empty.";
      this.setState({ errors });
    }
    if (nameValue === "") {
      nameError.css("display", "flex").show();
      errors.name = "Name field can't be empty.";
      this.setState({ errors });
    }
    if (
      getComputedStyle(document.querySelector("#name-error")).getPropertyValue(
        "display"
      ) === "none" &&
      getComputedStyle(document.querySelector("#id-error")).getPropertyValue(
        "display"
      ) === "none" &&
      getComputedStyle(
        document.querySelector("#password-error")
      ).getPropertyValue("display") === "none"
    ) {
      this.Register(nameValue, idValue, passwordValue);
      console.log("Validated Successfully!");
    }
  }

  // Tries to register a new user with his name, id and password.
  Register(name, id, password) {
    // Sendeing a request using axios to the server api goes here...
  }
  // Triggered when name field text changed to a new value.
  nameFieldInputed(e) {
    let errors = this.state.errors;
    let nameError = $("#name-error");

    if (e.currentTarget.value !== "") {
      $("#name-error").hide();
      errors.name = "";
      this.setState({ errors });
    } else if (e.currentTarget.value === "") {
      nameError.css("display", "flex").show();
      errors.name = "Name field can't be empty.";
      this.setState({ errors });
    }
  }

  // Triggered when id field text changed to a new value.
  idFieldInputed(e) {
    let onlyNumbersRegex = /^[0-9]+$/;
    let senderValue = e.currentTarget.value;
    let isMatch = onlyNumbersRegex.test(senderValue);
    let errors = this.state.errors;

    if (isMatch) {
      $("#id-error").hide();
      errors.id = "";
      this.setState({ errors });
    } else {
      errors.id = "ID number must contains only numbers.";
      this.setState({ errors });
      $("#id-error").css("display", "flex").show();
    }
  }

  // Triggered when password field text changed to a new value.
  passwordFieldInputed(e) {
    let passwordRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}.*$/;
    let senderValue = e.currentTarget.value;
    let isMatch = passwordRegex.test(senderValue);
    let errors = this.state.errors;

    if (isMatch) {
      $("#password-error").hide();
      errors.password = "";
      this.setState({ errors });
    } else {
      errors.password =
        "Password must contains at minimum eight characters, at least one uppercase letter, one lowercase letter and one number.";
      this.setState({ errors });
      $("#password-error").css("display", "flex").show();
    }
  }

  // Renders customer enter component on the page (navigate to It).
  goToCustomerEnter() {
    ReactDOM.render(
      <CustomerEnter />,
      document.getElementById("entry-container")
    );
  }

  // Component created for the first time.
  componentDidMount() {
    AOS.init();
    $("input[type='text']")[0].focus();
  }

  // Component rendered as result of (updating, creating, etc.)
  render() {
    return (
      <div
        id="customer-enter-container"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <EntryHeader
          buttonOnClick={this.goToCustomerEnter}
          buttonText="Enter"
          caption="Already have an account?"
        />
        <div id="form-register-container">
          <div id="form-register-intro">
            <h1>Register Now!</h1>
            <img src={SignInCustomerImg} draggable="false" />
          </div>
          <form id="form-register" noValidate onSubmit={this.registerSubmitted}>
            <TextBox
              inputId="name-in"
              errorId="name-error"
              error={this.state.errors.name}
              placeholder="Name"
              type="text"
              onInput={this.nameFieldInputed}
            />
            <TextBox
              inputId="id-in"
              errorId="id-error"
              onInput={this.idFieldInputed}
              error={this.state.errors.id}
              placeholder="ID Number"
              type="number"
            />
            <PasswordBox
              inputId="password-in"
              errorId="password-error"
              error={this.state.errors.password}
              placeholder="Password"
              onInput={this.passwordFieldInputed}
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
export default CustomerRegister;
