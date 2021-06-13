import React, { Component } from "react";
import "./styles/CustomerSearch.css";
import TextBox from "../inputs/TextBox";
import DefaultButton from "../inputs/DefaultButton";
import SelectBox from "../inputs/SelectBox";
import IconButton from "../inputs/IconButton";
import SearchSomthingImg from "../../assets/vectors/SearchSomthing.svg";
import $ from "jquery";

class CustomerSearch extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      searchInSelectedIndex: "0",
    };

    // Binding Methods
    this.onSearchInValueSelected = this.onSearchInValueSelected.bind(this);
    this.searchBackClicked = this.searchBackClicked.bind(this);
  }
  searchBackClicked(e) {
    $(this.ref.current).slideUp(150);
    $("body").css("overflow-y", "unset");
  }
  onSearchInValueSelected(value, index) {
    this.setState({ searchInSelectedIndex: index });
  }
  UNSAFE_componentWillMount() {}

  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}

  render() {
    return (
      <div id="customer-search-container" ref={this.ref}>
        <p id="customer-search-title">
          <IconButton
            onClick={this.searchBackClicked}
            id="customer-search-back"
            iconClass="fa fa-arrow-left"
            tooltip="Back"
          />
          Search
        </p>
        <div id="customer-search-header">
          <TextBox
            inputId="customer-search-in"
            id="customer-search-box"
            placeholder="Type Something..."
          />
          <DefaultButton id="customer-search-btn" text="Search" />
        </div>
        <div id="customer-search-status">
          <p>Write then hit "enter" or click "search".</p>
          <SelectBox
            id="searchInSelectBox"
            selectedIndex={this.state.searchInSelectedIndex}
            items={["Products", "Categories", "Restaurants"]}
            direction="bottom"
            placeholder="Search In"
            onValueSelected={this.onSearchInValueSelected}
          />
        </div>
        <div id="customer-search-results-container">
          <div id="customer-search-basic">
            <p>Search Products, Categories, Restuarants...</p>
            <img
              id="customer-search-basic-img"
              src={SearchSomthingImg}
              draggable="false"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerSearch;
