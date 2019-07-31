"use strict";

class LinkButton extends React.PureComponent {
  render() {
    return React.createElement("a", {
      className: "link-icon__button",
      href: this.props.url,
      target: "_blank",
      title: this.props.title
    }, React.createElement("img", {
      className: "link-icon",
      src: this.props.image
    }));
  }

}

class LinkButtonsContainer extends React.PureComponent {
  render() {
    return React.createElement("div", {
      className: "link-icons__container"
    }, this.props.children);
  }

}

export { LinkButton, LinkButtonsContainer };