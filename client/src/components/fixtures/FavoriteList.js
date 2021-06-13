import React, { Component } from "react";
import CustomerProductCard from "../cards/CustomerProductCard";
import "./styles/FavoriteList.css";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      favorites: [],
      loading: "true",
    };

    // Binding Methods
  }
  componentDidMount() {
    Axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=i").then(
      (response) => {
        let data = response.data.meals.slice(0, 10);
        this.setState({ favorites: data }, () => {
          let loader = document.querySelector("#favorites-loading");
          if (loader) loader.remove();
        });
      }
    );
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="favorite-list-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        {this.state.favorites.map((favorite, i) => {
          return (
            <CustomerProductCard
              id={favorite.idMeal}
              isFavorite={true}
              name={favorite.strMeal}
              price="$45.5"
              description={favorite.strInstructions.slice(0, 200)}
              photo={favorite.strMealThumb}
              onProductAdd={this.props.productAdded}
              hasTags={true}
              isOffer={i % 2 === 0 ? true : false}
              isNew={true}
              isAvailable={i % 2 === 0 ? true : false}
              rating={3}
              offerTooltip="50% Off!"
            />
          );
        })}
        <div id="favorites-loading">
          <CircleLoader isActive={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default FavoriteList;
