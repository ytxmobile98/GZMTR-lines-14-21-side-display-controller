"use strict";

class WarningNote extends React.PureComponent {
  render() {
    return React.createElement("div", {
      className: "notes--warning"
    }, this.props.content);
  }

}

export { WarningNote };