import React, { Component } from "react";
import RecentOrderCard from "../cards/RecentOrderCard";
import "./styles/RecentOrders.css";

class RecentOrders extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="recent-orders-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      >
          {this.props.orders.map((order) => {
          return <RecentOrderCard date={order.date} total={order.total} />;
          })}
      </div>
    );  
  }
}

export default RecentOrders;
