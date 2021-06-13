import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/CustomerReviewCard.css";

class CustomerReviewCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    this.id = 0;
    this.userId = 0;
    // State Object
    this.state = {
      likes: parseInt(this.props.likes),
      dislikes: parseInt(this.props.dislikes),
    };

    // Binding Methods
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }
  dislike(e) {
    let target = e.currentTarget.children[0];
    let className = "review-liked";
    if (target.classList.contains(className)) return;
    let current = this.rootRef.current
      .querySelectorAll(".customer-review-card-right i")
      .forEach((element) => {
        if (element.classList.contains(className))
        {
          element.classList.remove(className);
          this.setState({ likes: this.state.likes - 1 });
        }
      });
    target.classList.toggle(className);
    this.setState({ dislikes: this.state.dislikes + 1 });
  }
  like(e) {
    let target = e.currentTarget.children[0];
    let className = "review-liked";
    if (target.classList.contains(className)) return;
    let current = this.rootRef.current
      .querySelectorAll(".customer-review-card-right i")
      .forEach((element) => {
        if (element.classList.contains(className))
        {
          element.classList.remove(className);
          this.setState({ dislikes: this.state.dislikes - 1 });
        }
      });
    target.classList.toggle(className);    
    this.setState({ likes: this.state.likes + 1 });
  }
  componentDidMount() {
    this.id = this.props.reviewId;
    this.userId = this.props.userId;
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="customer-review-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className="customer-review-card-left">
          <div className="customer-review-card-top">
            <a href={this.props.profileLink}>
              <img
                className="customer-review-card-photo"
                src={this.props.photo}
                alt=""
              />
            </a>
            <div className="customer-review-card-name-time">
              <p className="customer-review-card-name">{this.props.name}</p>
              <time className="customer-review-card-time">
                <i className="b i bi-clock"></i>
                {this.props.time}
              </time>
            </div>
          </div>
          <div className="customer-review-card-bottom">{this.props.review}</div>
        </div>
        <div className="customer-review-card-right">
          <p>
            <IconButton
              iconClass="bi bi-hand-thumbs-up-fill"
              onClick={this.like}
              tooltip="Like"
            />
            {this.state.likes}
          </p>
          <p>
            <IconButton
              iconClass="bi bi-hand-thumbs-down-fill"
              tooltip="Dislike"
              onClick={this.dislike}
            />
            {this.state.dislikes}
          </p>
        </div>
      </div>
    );
  }
}

export default CustomerReviewCard;
