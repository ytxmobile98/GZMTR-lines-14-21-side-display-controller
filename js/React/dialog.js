"use strict";

import { TypeChecker } from "../type-checker.js";

class DialogHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", {
      className: "modal-dialog__header"
    }, React.createElement("button", {
      className: "modal-dialog__header__button modal-dialog__header__button--back",
      disabled: !this.props.onGoBack ? "disabled" : null,
      onClick: this.props.onGoBack
    }), React.createElement("div", {
      className: "modal-dialog__header__title"
    }, this.props.title), React.createElement("button", {
      className: "modal-dialog__header__button modal-dialog__header__button--close",
      onClick: this.props.onClose
    }));
  }

}

class DialogFooter extends React.Component {
  constructor(props) {
    super(props);
    this.defaultDoneText = "完成";
    this.defaultCloseText = "取消";
  }

  render() {
    return React.createElement("div", {
      className: "modal-dialog__footer"
    }, React.createElement("button", {
      className: "modal-dialog__footer__button button--primary",
      onClick: this.props.onClose
    }, this.props.closeText || this.defaultCloseText), React.createElement("button", {
      className: "modal-dialog__footer__button button--action",
      onClick: this.props.onDone
    }, this.props.doneText || this.defaultDoneText));
  }

}

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  goBack() {
    this.props.onGoBack();
  }

  close() {
    this.props.onClose();
  }

  done() {
    this.props.onDone();
  }

  render() {
    return React.createElement("div", {
      className: "modal-dialog"
    }, React.createElement(DialogHeader, {
      onGoBack: this.props.onGoBack,
      title: this.props.title,
      onClose: this.close.bind(this)
    }), React.createElement("div", {
      className: "modal-dialog__center"
    }, this.props.children), React.createElement(DialogFooter, {
      onDone: this.done.bind(this),
      doneText: this.props.doneText,
      onClose: this.close.bind(this)
    }));
  }

}

export { Dialog };