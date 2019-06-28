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
			</div>
		);
	}
}

export { Dialog };
