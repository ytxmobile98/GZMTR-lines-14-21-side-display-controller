"use strict";

import { TypeChecker } from "../type-checker.js";

class DialogHeader extends React.Component {
	constructor(props) {
		super(props);
		this.title = props.title;
		this.onGoBack = props.onGoBack;
		this.onClose = props.onClose;
	}

	render() {
		return React.createElement(
			"div",
			{ className: "modal-dialog__header" },
			React.createElement("button", {
				className: "modal-dialog__header-button modal-dialog__header-button--back",
				disabled: !this.onGoBack ? "disabled" : null,
				onClick: this.onGoBack
			}),
			React.createElement(
				"div",
				{ className: "modal-dialog__header-title" },
				this.title
			),
			React.createElement("button", {
				className: "modal-dialog__header-button modal-dialog__header-button--close",
				onClick: this.onClose
			})
		);
	}
}

class DialogFooter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			doneText: props.doneText || "完成",
			onDone: props.onDone,

			closeText: props.closeText || "取消",
			onClose: props.onClose
		};
	}

	render() {
		return React.createElement(
			"div",
			{ className: "modal-dialog__footer" },
			React.createElement(
				"button",
				{
					className: "modal-dialog__footer-button modal-dialog__footer-button--done",
					onClick: this.state.onDone },
				this.state.doneText
			),
			React.createElement(
				"button",
				{
					className: "modal-dialog__footer-button modal-dialog__footer-button--close",
					onClick: this.state.onClose },
				this.state.closeText
			)
		);
	}
}

class Dialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.title,

			onGoBack: props.onGoBack,
			onClose: props.onClose,
			onDone: props.done
		};
	}

	goBack() {
		this.state.onGoBack();
	}

	close() {
		this.state.onClose();
	}

	done() {
		this.state.onDone();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "modal-dialog" },
			React.createElement(DialogHeader, {
				title: this.state.title,
				onClose: this.close.bind(this)
			}),
			React.createElement(
				"div",
				{ className: "modal-dialog__center" },
				this.props.children
			),
			React.createElement(DialogFooter, {
				onDone: this.close.bind(this),
				onClose: this.close.bind(this)
			})
		);
	}
}

export { Dialog };