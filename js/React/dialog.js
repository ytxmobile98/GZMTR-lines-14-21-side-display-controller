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

class DialogFooter extends React.Component {}

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
			})
		);
	}
}

export { Dialog };