"use strict";

class MasterButtonsContainer extends React.PureComponent {
  render() {
    return React.createElement("div", {
      className: "master-buttons__container"
    }, this.props.children);
  }

}

class MasterButton extends React.PureComponent {
  render() {
    return React.createElement("button", {
      className: "master-button button--action",
      onClick: this.props.onClick
    }, this.props.text);
  }

}

export { MasterButtonsContainer, MasterButton };