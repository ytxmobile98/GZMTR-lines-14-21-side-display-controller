"use strict";

import { TypeChecker } from "../type-checker.js";

const MODAL_MODE_NAMES = ["standby"];

const MODAL_MODES = Object.freeze(new (function() {
	TypeChecker.checkArrayType(MODAL_MODE_NAMES, "string");
	const that = this;
	MODAL_MODE_NAMES.forEach((name) => {
		that[name] = Symbol();
	})
})());

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: props.modalMode,
		}
	}

	closeModal() {
		this.props.onCloseModal();
	}

	componentDidMount() {
		this.props.onMount();
	}

	componentWillUnmount() {
		this.props.onUnmount();
	}

	render() {

		const closedModalText = (this.state.modalMode === MODAL_MODES.standby) ? "当前处于待机模式，点击以恢复" : "关闭遮罩";

		return (
			<div className="modal">
				<div className="modal__background">
					<button className="modal__close-button" onClick={this.closeModal.bind(this)}>
						{closedModalText}
					</button>
				</div>
			</div>
		);
	}
}

export { MODAL_MODES, Modal };
