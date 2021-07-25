"use strict";

import { TypeChecker } from "../type-checker.js";

class DialogHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="modal-dialog__header">

				<button
					className="modal-dialog__header__button modal-dialog__header__button--back"
					disabled={!this.props.onGoBack ? "disabled" : null}
					onClick={this.props.onGoBack}
				>
				</button>

				<div className="modal-dialog__header__title">
					{this.props.title}
				</div>

				<button
					className="modal-dialog__header__button modal-dialog__header__button--close"
					onClick={this.props.onClose}
				>
				</button>

			</div>
		);
	}
}

class DialogFooter extends React.Component {
	constructor(props) {
		super(props);
		this.defaultDoneText = "完成";
		this.defaultCloseText = "取消";
	}

	render() {
		return (
			<div className="modal-dialog__footer">

				<button
					className="modal-dialog__footer__button button--primary"
					onClick={this.props.onClose}>
					{this.props.closeText || this.defaultCloseText}
				</button>

				<button
					className="modal-dialog__footer__button button--action"
					onClick={this.props.onDone}>
					{this.props.doneText || this.defaultDoneText}
				</button>

			</div>
		);
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
		return (
			<div className="modal-dialog">
				<DialogHeader
					onGoBack={this.props.onGoBack}
					title={this.props.title}
					onClose={this.close.bind(this)}
				/>

				<div className="modal-dialog__center">
					{this.props.children}
				</div>

				<DialogFooter
					onDone={this.done.bind(this)}
					doneText={this.props.doneText}
					onClose={this.close.bind(this)}
				/>
			</div>
		);
	}
}

export { Dialog };
