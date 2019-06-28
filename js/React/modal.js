"use strict";

import { TypeChecker } from "../type-checker.js";

import { Dialog } from "./dialog.js";

const MODAL_MODE_NAMES = ["standby"];

const MODAL_MODES = Object.freeze(new function () {
	TypeChecker.checkArrayType(MODAL_MODE_NAMES, "string");
	const that = this;
	MODAL_MODE_NAMES.forEach(name => {
		that[name] = Symbol();
	});
}());

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: props.modalMode
		};
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
		const closedModalText = this.state.modalMode === MODAL_MODES.standby ? "当前处于待机模式，点击以恢复" : defaultTextTip;

		const closeModal = this.closeModal.bind(this);

		return React.createElement(
			"div",
			{ className: "modal" },
			React.createElement(
				"div",
				{ className: "modal__background" },
				React.createElement(
					"button",
					{ className: "modal__close-button", title: defaultTextTip, onClick: closeModal },
					closedModalText
				)
			),
			React.createElement(Dialog, { onClose: closeModal, title: "\u9009\u62E9\u7EBF\u8DEF\u548C\u76EE\u7684\u5730" })
		);
	}
}

export { MODAL_MODES, Modal };