"use strict";

import { StatusContainer, StatusGridContainer, StatusCell } from "./status-grid.js";

class MonitorArea extends React.PureComponent {
  render() {
    return React.createElement(StatusContainer, {
      multiCols: true
    }, this.props.children);
  }

}

class DisplayModeGrid extends React.PureComponent {
  render() {
    return React.createElement(StatusGridContainer, {
      sectionHeader: "\u65B9\u5411\u5E55\u663E\u793A\u72B6\u6001"
    }, React.createElement(StatusCell, {
      itemName: "\u663E\u793A\u6A21\u5F0F",
      itemData: this.props.autoDisplayMode ? "自动" : "手动",
      dataTag: "status-display-mode",
      dataValue: this.props.autoDisplayMode ? "自动" : "手动"
    }), React.createElement(StatusCell, {
      itemName: "\u5DE6\u4FA7",
      itemData: this.props.leftDisplay ? "开" : "关",
      dataTag: "status-display-switch",
      dataValue: this.props.leftDisplay ? "开" : "关"
    }), React.createElement(StatusCell, {
      itemName: "\u53F3\u4FA7",
      itemData: this.props.rightDisplay ? "开" : "关",
      dataTag: "status-display-switch",
      dataValue: this.props.rightDisplay ? "开" : "关"
    }));
  }

}

class TrainInfoGrid extends React.PureComponent {
  render() {
    return React.createElement(StatusGridContainer, {
      sectionHeader: "\u5217\u8F66\u8FD0\u8425\u72B6\u6001"
    }, React.createElement(StatusCell, {
      itemName: "\u7EBF\u8DEF",
      itemData: this.props.line,
      dataTag: "status-line",
      dataValue: this.props.line,
      sidePadding: true
    }), React.createElement(StatusCell, {
      itemName: "\u76EE\u7684\u5730",
      itemData: this.props.destination.Chinese,
      dataTag: "status-destination",
      dataValue: this.props.destination.Chinese
    }), React.createElement(StatusCell, {
      itemName: "\u8F66\u79CD",
      itemData: this.props.serviceType.Chinese,
      dataTag: "status-service-type",
      dataValue: this.props.serviceType.Chinese,
      sidePadding: true
    }));
  }

}

export { MonitorArea, DisplayModeGrid, TrainInfoGrid };