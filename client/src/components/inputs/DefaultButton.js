import React, { Component } from "react";
import "./styles/DefaultButton.css";

class DefaultButton extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {
      class: "default-fill-btn",
    };
  }

  componentDidUpdate()
  {
    
  }
  componentDidMount() {
    let currentClass = "default-fill-btn";
    // Button Types
    if (this.props.type === "outline") {
      currentClass = "default-outline-btn";
    } else if (this.props.type === "fill") {
        currentClass = "default-fill-btn";
    }
    // Button Sizes
    if (this.props.size === "xsmall") {
      currentClass += ` xsmall`;
    } else if (this.props.size === "small") {
      currentClass += ` small`;
    } else if (this.props.size === "medium") {
      currentClass += ` medium`;
    } else if (this.props.size === "large") {
      currentClass += ` large`;
    } else if (this.props.size === "xlarge") {
      currentClass += ` xlarge`;
    }
    currentClass += " " + this.props.className;
    this.setState({class: currentClass});
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.state.class}
        style={this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        type={this.props.inputType}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
      >
        {this.props.text} <i className={this.props.iconClass}></i>
      </button>
    );
  }
}

export default DefaultButton;
