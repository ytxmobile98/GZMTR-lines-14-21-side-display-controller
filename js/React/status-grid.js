"use strict";

class StatusCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.itemDataRef = React.createRef();
  }

  updateDataTag() {
    const dataTag = this.props.dataTag ? `data-js-${this.props.dataTag}` : undefined;
    const dataValue = this.props.dataValue;
    const itemDataElement = this.itemDataRef.current;
    itemDataElement.removeAttribute(this.dataTag);

    if (!!dataTag) {
      this.dataTag = dataTag;
      this.dataValue = dataValue;
      itemDataElement.setAttribute(dataTag, dataValue);
    }
  }

  componentDidMount() {
    this.updateDataTag();
  }

  componentDidUpdate() {
    this.updateDataTag();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "status__item-name"
    }, this.props.itemName), React.createElement("div", {
      className: "status__item-data-container"
    }, React.createElement("span", {
      className: "status__item-data",
      ref: this.itemDataRef,
      "data-js-side-padding": this.props.sidePadding ? true : null
    }, this.props.itemData || this.props.children)));
  }

}

class StatusGridContainer extends React.PureComponent {
  render() {
    return React.createElement("div", {
      className: "status__grid-container"
    }, React.createElement("div", {
      className: "status__section-header"
    }, this.props.sectionHeader), this.props.children);
  }

}

class StatusContainer extends React.PureComponent {
  render() {
    return React.createElement("div", {
      className: "status__container",
      "data-js-multi-cols": this.props.multiCols ? true : null
    }, this.props.children);
  }

}

export { StatusCell, StatusGridContainer, StatusContainer };