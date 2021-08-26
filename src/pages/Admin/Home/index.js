import React, { Component } from "react";

export default class AdminHomepage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          Welcome {currentUser.displayName}
        </h2>
      </div>
    );
  }
}
