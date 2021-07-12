import React, { Component } from "react";
import "./styles/ProfileSettings.css";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import Badges from "../labels/Badges";
import DefaultButton from "../inputs/DefaultButton";
import MessageBox from "../alerts/MessageBox";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import Axios from "axios";

class ProfileSettings extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      username: "Mohamad Hag",
      email: "mohamadhag99@gmail.com",
      phone: "0940322106",
      isMessageBoxOpen: "false",
      messageBoxTitle: "",
      messageBoxDescription: "",
      messageBoxControls: "yes-no",
      currentDangerAction: "delete",
      user: [],
    };

    // Binding Methods
    this.usernameChanged = this.usernameChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.phoneChanged = this.phoneChanged.bind(this);
    this.deleteAccountClicked = this.deleteAccountClicked.bind(this);
    this.resetAccountClicked = this.resetAccountClicked.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  getUser() {
    let formData = {
      id: Cookies.get("id"),
    };
    let api = `${getHost()}/customer/getuser`;
    Axios.post(api, formData).then((response) => {
      let data = response.data.data;
      this.setState({ user: data }, () => {
        this.setState({ username: this.state.user.Name, phone: this.state.user.Phone });
      });
    });
  }
  messageBoxValueSelected(value) {
    if (value === "Yes") {
      let action = this.state.currentDangerAction;
      if (action === "delete") {
        // Deletion Method
      } else if (action === "logout") {
        Cookies.set("id", "", 0);
        window.location.href = "/entry";
      } else if (action === "reset") {
        // Reseting Method
      }
    } else {
      this.setState({ isMessageBoxOpen: "false" });
    }
  }
  logoutClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Log Out" });
    this.setState({
      messageBoxDescription: "Do you want really to log out from your account?",
    });
    this.setState({ currentDangerAction: "logout" });
  }
  resetAccountClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Account Reset" });
    this.setState({
      messageBoxDescription:
        "Do you want really to reset your account? This step can't be undone!",
    });
    this.setState({ currentDangerAction: "reset" });
  }
  deleteAccountClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Account Deletion" });
    this.setState({
      messageBoxDescription:
        "Do you want really to delete your account? This step can't be undone!",
    });
    this.setState({ currentDangerAction: "delete" });
  }
  usernameChanged(e) {
    this.setState({ username: e.target.value });
  }
  emailChanged(e) {
    this.setState({ email: e.target.value });
  }
  phoneChanged(e) {
    this.setState({ phone: e.target.value });
  }
  componentDidMount() {
    this.getUser();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="profile-settings-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <p className="profile-settings-title">
          <i className="bi bi-circle-fill"></i>General
        </p>
        <TextBox
          type="text"
          value={this.state.username}
          placeholder="Username"
          onChange={this.usernameChanged}
        />
        <TextBox
          placeholder="Email"
          type="email"
          value={this.state.email}
          onChange={this.emailChanged}
        />
        <TextBox
          placeholder="Email"
          type="number"
          value={this.state.phone}
          onChange={this.phoneChanged}
        />
        <PasswordBox placeholder="Old Password" />
        <PasswordBox placeholder="New Password" />
        <DefaultButton
          id="save-changes-btn"
          text="Save Changes&nbsp;&nbsp;&nbsp;"
          iconClass="bi bi-save"
          onClick={this.saveChangesClicked}
        />
        <p className="profile-settings-title">
          <i className="bi bi-circle-fill"></i>Danger Zone
          <Badges text="Whatch out" background="var(--error-color)" />
        </p>
        <DefaultButton
          id="delete-my-account-btn"
          text="Delete My Account&nbsp;&nbsp;&nbsp;"
          iconClass="bi bi-trash-fill"
          onClick={this.deleteAccountClicked}
        />
        <DefaultButton
          id="reset-my-account-btn"
          text="Reset My Account&nbsp;&nbsp;&nbsp;"
          iconClass="bi bi-arrow-clockwise"
          onClick={this.resetAccountClicked}
        />
        <DefaultButton
          id="log-out-btn"
          text="Log Out&nbsp;&nbsp;&nbsp;"
          iconClass="bi bi-arrow-bar-right"
          onClick={this.logoutClicked}
        />
        <MessageBox
          title={this.state.messageBoxTitle}
          description={this.state.messageBoxDescription}
          controls={this.state.messageBoxControls}
          type="warning"
          isOpen={this.state.isMessageBoxOpen}
          onValueSelected={this.messageBoxValueSelected}
        />
      </div>
    );
  }
}

export default ProfileSettings;
