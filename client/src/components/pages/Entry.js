import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles/Entry.css";
  
// Assets
import RoleSelection from "../fixtures/RoleSelection";

class Entry extends Component {
  constructor(props) {
    super(props);

    // refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      selectedRole: "Manager",
    };

    //Bindings Methods
  }
  componentDidMount() {}
  render() {
    return (
      <div ref={this.ref} id="entry-container">
        <RoleSelection />
      </div>
    );
  }
}
export default Entry;
