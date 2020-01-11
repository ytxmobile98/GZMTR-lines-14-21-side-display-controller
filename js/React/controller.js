"use strict"; // Type checker

import { TypeChecker } from "../type-checker.js"; // Train service data

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/LINES-DATA.js"; // Controller top area

import { LED } from "./LED.js"; // Controller center area

import { MonitorArea, DisplayModeGrid, TrainInfoGrid } from "./monitor-grids.js";
import { MasterButton, MasterButtonsContainer } from "./master-buttons.js"; // Controller bottom area

import { Clock } from "./clock.js";
import { WarningNote } from './warning-note.js';
import { UsefulLinks } from "./useful-links.js"; // Controller modal dialogs

import { defaultModalMode, Modal } from "./modal.js";
import { SetDisplayModeDialog } from "./dialog-set-display-mode.js";
import { SetServiceDialog } from "./dialog-set-service.js"; // The main component class for the controller

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal mode
      modalMode: defaultModalMode,
      // current display mode
      autoDisplayMode: true,
      leftDisplay: true,
      rightDisplay: true,
      // current destination information
      line: LineInfoWrapper.getDefaultLine(),
      serviceType: LineInfoWrapper.getDefaultServiceType(),
      destination: LineInfoWrapper.getDefaultDest()
    };
  }

  updateDisplayMode(auto, left, right) {
    this.setState({
      autoDisplayMode: !!auto,
      leftDisplay: !!left,
      rightDisplay: !!right
    });
  }

  updateOutputDisplay(line, serviceType, destination) {
    TypeChecker.checkInstanceOf(serviceType, ServiceType);
    TypeChecker.checkInstanceOf(destination, Station);
    this.setState({
      line: String(line || ""),
      serviceType: serviceType,
      destination: destination
    });
  }

  componentDidMount() {
    const action = () => {
      if (!this.state.modalMode) {
        this.resetTimeout();
      }
    };

    const body = document.body;
    this.bodyClickListener = body.addEventListener("click", action);
    this.bodyKeyDownListener = body.addEventListener("keydown", action);
  }

  componentWillUnmount() {
    const body = document.body;
    body.removeEventListener("click", this.bodyClickListener);
    body.removeEventListener("keydown", this.bodyKeyDownListener);
  }

  setTimeout() {
    const timeout = 60 * 1000;
    this.timeout = window.setTimeout(() => {
      this.openModal();
    }, timeout);
  }

  clearTimeout() {
    window.clearTimeout(this.timeout);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  openModal(modalMode) {
    TypeChecker.checkOptionalTypeOf(modalMode, "string");
    this.setState({
      modalMode: modalMode || defaultModalMode
    });
  }

  closeModal() {
    this.setState({
      modalMode: null
    });
    this.resetTimeout();
  }

  render() {
    const setTimeout = this.setTimeout.bind(this);
    const clearTimeout = this.clearTimeout.bind(this);
    const resetTimeout = this.resetTimeout.bind(this);
    const openModal = this.openModal.bind(this);
    const closeModal = this.closeModal.bind(this);
    const showContent = this.state.autoDisplayMode || this.state.leftDisplay || this.state.rightDisplay;
    return React.createElement("div", {
      className: "controller"
    }, React.createElement("div", {
      className: "controller__top"
    }, React.createElement(LED, {
      serviceType: this.state.serviceType,
      destination: this.state.destination,
      showContent: showContent
    })), React.createElement("div", {
      className: "controller__center"
    }, React.createElement(MonitorArea, null, React.createElement(DisplayModeGrid, {
      autoDisplayMode: this.state.autoDisplayMode,
      leftDisplay: this.state.leftDisplay,
      rightDisplay: this.state.rightDisplay
    }), React.createElement(TrainInfoGrid, {
      line: this.state.line,
      destination: this.state.destination,
      serviceType: this.state.serviceType
    })), React.createElement(MasterButtonsContainer, null, React.createElement(MasterButton, {
      onClick: () => {
        openModal("setDisplayMode");
      },
      text: "\u5F00\u542F/\u5173\u95ED\u65B9\u5411\u5E55"
    }), React.createElement(MasterButton, {
      onClick: () => {
        openModal("setService");
      },
      text: "\u66F4\u6539\u76EE\u7684\u5730/\u8F66\u79CD"
    }))), React.createElement("div", {
      className: "controller__bottom"
    }, React.createElement(Clock, null), React.createElement(WarningNote, {
      content: "\u6CE8\u610F\uFF1A\u59821\u5206\u949F\u5185\u65E0\u64CD\u4F5C\uFF0C\u6B64\u8BBE\u5907\u5C06\u8FDB\u5165\u5F85\u673A\u6A21\u5F0F\u3002"
    }), React.createElement(UsefulLinks, null)), this.state.modalMode ? React.createElement(Modal, {
      modalMode: this.state.modalMode,
      onMount: this.clearTimeout.bind(this),
      onUnmount: this.resetTimeout.bind(this),
      onCloseModal: this.closeModal.bind(this)
    }, this.state.modalMode === "setDisplayMode" ? React.createElement(SetDisplayModeDialog, {
      updateDisplayMode: (auto, left, right) => {
        this.updateDisplayMode(auto, left, right);
        closeModal();
      },
      onClose: closeModal,
      autoDisplayMode: this.state.autoDisplayMode,
      leftDisplay: this.state.leftDisplay,
      rightDisplay: this.state.rightDisplay
    }) : null, this.state.modalMode === "setService" ? React.createElement(SetServiceDialog, {
      title: "\u9009\u62E9\u76EE\u7684\u5730",
      updateOutputDisplay: (line, serviceType, destination) => {
        this.updateOutputDisplay(line, serviceType, destination);
        closeModal();
      },
      onClose: closeModal,
      line: this.state.line,
      serviceType: this.state.serviceType,
      destination: this.state.destination
    }) : null) : null);
  }

}

export { Controller };