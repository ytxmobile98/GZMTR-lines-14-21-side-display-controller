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
		return (
			<div className="modal-dialog__header">
				<button
					className="modal-dialog__header-button modal-dialog__header-button--back"
					disabled={!this.onGoBack ? "disabled" : null}
					onClick={this.onGoBack}
				>
				</button>
				<div className="modal-dialog__header-title">
					{this.title}
				</div>
				<button
					className="modal-dialog__header-button modal-dialog__header-button--close"
					onClick={this.onClose}
				>
				</button>
			</div>
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
			onClose: props.onClose,
		}
	}

	render() {
		return (
			<div className="modal-dialog__footer">
				<button
					className="modal-dialog__footer-button modal-dialog__footer-button--done"
					onClick={this.state.onDone}>
					{this.state.doneText}
				</button>
				<button
					className="modal-dialog__footer-button modal-dialog__footer-button--close"
					onClick={this.state.onClose}>
					{this.state.closeText}
				</button>
			</div>
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
			onDone: props.done,
		}
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
		return (
			<div className="modal-dialog">
				<DialogHeader
					title={this.state.title}
					onClose={this.close.bind(this)}
				/>
				<div className="modal-dialog__center">
					{this.props.children}
				</div>
				<DialogFooter
					onDone={this.close.bind(this)}
					onClose={this.close.bind(this)}
				/>
			</div>
		);
	}
}

export { Dialog };
