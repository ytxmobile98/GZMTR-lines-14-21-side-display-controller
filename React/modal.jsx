"use strict";

import { TypeChecker } from "../type-checker.js";

import { Dialog } from "./dialog.js";

const MODAL_MODE_NAMES = ["standby", "setDisplayMode", "setDestination"];
const MODAL_MODES = Object.freeze(new (function() {
	TypeChecker.checkArrayType(MODAL_MODE_NAMES, "string");
	const that = this;
	MODAL_MODE_NAMES.forEach((name) => {
		that[name] = Symbol();
	})
})());
console.log(MODAL_MODES);

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

		const defaultTextTip = "关闭遮罩";
		const closedModalText = (this.state.modalMode === MODAL_MODES.standby) ? "当前处于待机模式，点击以恢复" : defaultTextTip;

		const closeModal = this.closeModal.bind(this);

		return (
			<div className="modal">
				<div className="modal__background">
					<button className="modal__close-button" title={defaultTextTip} onClick={closeModal}>
						{closedModalText}
					</button>
				</div>

				{/*<Dialog
						onClose={closeModal}
					>
				</Dialog>*/}


			</div>
		);
	}
}

export { MODAL_MODES, Modal };
