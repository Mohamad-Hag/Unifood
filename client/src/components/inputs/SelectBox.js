import React, { Component } from "react";
import "./styles/SelectBox.css";
import $ from "jquery";

class SelectBox extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {
      isOpen: "false",
      selectedValue: null,
      selectedIndex: null,
      direction: "bottom",
    };
    this.ref = React.createRef();

    // Bindings Methods
    this.selectBoxToggleClicked = this.selectBoxToggleClicked.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
    this.selectBoxPlaceholderClicked = this.selectBoxPlaceholderClicked.bind(
      this
    );
  }
  componentDidMount() {
    $(document).mouseup((e) => {
      if (this.ref.current === null) return;
      let itemsContainers = $(".select-box-toggle");
      for (let i = 0; i < itemsContainers.length; i++) {
        let itemsBox = itemsContainers[i];
        if (
          itemsBox !== e.target &&
          itemsBox.childNodes[0] !== e.target &&
          itemsBox.childNodes[1] !== e.target
        ) {
          for (let el of $(".select-box-toggle .bi")) {
            el.style.transform = "rotate3d(1, 0, 0, 0)";
            el.style.transform = "unset";
          }

          itemsBox.parentElement.childNodes[1].style.top = "30px";
          itemsBox.parentElement.childNodes[1].style.opacity = "0";
          setTimeout(() => {
            itemsBox.parentElement.childNodes[1].style.display = "none";
          }, 200);
          this.setState({ isOpen: "false" });
        }
      }
      this.ref.current.style.position = "m";
    });
    if (
      this.props.selectedIndex !== undefined &&
      this.props.selectedIndex !== null &&
      this.props.selectedIndex !== ""
    ) {
      let items = this.ref.current.childNodes[1].childNodes;
      let text = "";
      let e = null;
      for (let i = 0; i < items.length; i++) {
        if (i === parseInt(this.props.selectedIndex)) {
          text = items[i].childNodes[0].innerText;
          e = items[i];
          break;
        }
      }
      let itemIndex = this.props.selectedIndex;
      if (e === null) {
        text = items[0].childNodes[0].innerText;
        e = items[0];
        itemIndex = "0";
      }

      e.childNodes[1].style.opacity = "1";
      for (let el of e.parentElement.childNodes) {
        if (el !== e) {
          el.childNodes[1].style.opacity = "0";
        }
      }
      for (let el of $(".select-box-toggle .bi")) {
        el.style.transform = "rotate3d(1, 0, 0, 0)";
        el.style.transform = "unset";
      }
      let itemsBox = this.ref.current.childNodes[1];

      itemsBox.parentElement.childNodes[0].childNodes[0].innerText = this.props.placeholder !== undefined
      ? this.props.placeholder + ": " + text : text;

      this.setState({ selectedValue: text });
      this.setState({ selectedIndex: itemIndex });
      this.props.onValueSelected(text, itemIndex);

      itemsBox.style.top = "30px";
      itemsBox.style.opacity = "0";
      setTimeout(() => {
        itemsBox.style.display = "none";
      }, 200);
      this.setState({ isOpen: "false" });
    }
  }

  itemClicked(e) {
    let itemsBox = e.currentTarget.parentElement;
    let itemText = e.currentTarget.childNodes[0].innerText;
    let itemIndex = 0;
    let index = 0;

    e.currentTarget.childNodes[1].style.opacity = "1";
    for (let el of e.currentTarget.parentElement.childNodes) {
      if (el !== e.currentTarget) {
        el.childNodes[1].style.opacity = "0";
      }
    }
    for (let el of $(".select-box-toggle .bi")) {
      el.style.transform = "rotate3d(1, 0, 0, 0)";
      el.style.transform = "unset";
    }

    for (let el of itemsBox.childNodes) {
      if (el.childNodes[1].style.opacity === "1") {
        itemIndex = index;
      }
      index++;
    }

    itemsBox.parentElement.childNodes[0].childNodes[0].innerText =
      this.props.placeholder !== undefined
        ? this.props.placeholder + ": " + itemText
        : itemText;

    this.setState({ selectedValue: itemText });
    this.setState({ selectedIndex: itemIndex });
    this.props.onValueSelected(itemText, itemIndex);

    itemsBox.style.top = "30px";
    itemsBox.style.opacity = "0";
    setTimeout(() => {
      itemsBox.style.display = "none";
    }, 200);
    this.setState({ isOpen: "false" });
  }
  selectBoxPlaceholderClicked() {}
  selectBoxToggleClicked(e) {
    let itemsBox = e.currentTarget.parentElement.childNodes[1];
    let arrow = e.currentTarget.childNodes[1];

    let isOpen = itemsBox.style.display;
    if (isOpen !== "block") {
      this.ref.current.style.position = "relative";
      arrow.style.transform = "rotate3d(1, 0, 0, 180deg)";
      itemsBox.style.display = "block";
      setTimeout(() => {
        if (this.props.direction === "top") {
          itemsBox.style.top = -itemsBox.offsetHeight - 2 + "px";
        } else {
          itemsBox.style.top = "50px";
        }
        itemsBox.style.opacity = "1";
      }, 10);
      this.setState({ isOpen: "true" });
    } else {
      this.ref.current.style.position = "m";
      arrow.style.transform = "rotate3d(1, 0, 0, 0)";
      arrow.style.transform = "unset";
      itemsBox.style.top = "30px";
      itemsBox.style.opacity = "0";
      setTimeout(() => {
        itemsBox.style.display = "none";
      }, 200);
      this.setState({ isOpen: "false" });
    }
  }
  UNSAFE_componentWillReceiveProps(newPro) {}

  render() {
    return (
      <div
        ref={this.ref}
        id={this.props.id}
        className="select-box-container"
        style={this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        selectIndex="0"
      >
        <div
          tabIndex="0"
          className="select-box-toggle"
          onClick={this.selectBoxToggleClicked}
        >
          <span
            className="select-box-selected"
            onClick={this.selectBoxPlaceholderClicked}
          >
            {this.props.placeholder}
          </span>
          <span className="bi bi-chevron-down"></span>
        </div>
        <div tabIndex="0" className="select-box-items">
          {this.props.items.map((item) => {
            return (
              <div
                onClick={this.itemClicked}
                tabIndex="0"
                className="select-box-item"
              >
                <span>{item}</span>
                <span className="bi bi-check"></span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SelectBox;
