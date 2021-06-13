import React, { Component } from "react";
import DefaultButton from "../inputs/DefaultButton";
import CircleLoader from "../loaders/CircleLoader";
import "./styles/CategoryCard.css";
import AOS from "aos";

class CategoryCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      imageLoading: "true",
    };

    // Binding Methods
    this.imageLoaded = this.imageLoaded.bind(this);
    this.viewProductsClicked = this.viewProductsClicked.bind(this);
  }
  viewProductsClicked(e)
  {
    window.location.href = "/restaurants/name";
  }
  imageLoaded(e) {
    let parent = e.currentTarget.parentElement.children[1];
    setTimeout(() => {      
      this.setState({ imageLoading: "false" });
      parent.style.opacity = "0";
      setTimeout(() => {
        parent.remove();
      } ,100);      
    }, 1000);
  }
  componentDidMount() {
    AOS.init();
  }
  componentDidUpdate() {    }
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="category-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      >
        <div className="category-card-image">
          <img
            loading="lazy"
            onLoad={this.imageLoaded}
            src={this.props.photo}
          />
          <div className="category-card-image-loader">
            <CircleLoader isActive={this.state.imageLoading} />
          </div>
        </div>
        <div className="category-card-inner">
          <div>
            <h1>{this.props.category}</h1>
            <p>{this.props.description}</p>
          </div>
          <DefaultButton
            text="View Products&nbsp;&nbsp;&nbsp;"
            iconClass="fa fa-arrow-right"
            onClick={this.viewProductsClicked}
          />
        </div>
      </div>
    );
  }
}

export default CategoryCard;