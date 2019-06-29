"use strict";

import { TypeChecker } from "../type-checker.js";

import { MODAL_MODES } from "./modal-modes.js";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: props.modalMode
		};
		TypeChecker.checkOptionalTypeOf(props.modalMode, "symbol");
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

		const defaultToolTip = "关闭遮罩";
		const closedModalText = this.state.modalMode === MODAL_MODES.standby ? "当前处于待机模式，点击以恢复" : defaultToolTip;

		const closeModal = this.closeModal.bind(this);

		return React.createElement(
			"div",
			{ className: "modal" },
			React.createElement(
				"div",
				{ className: "modal__background" },
				React.createElement(
					"button",
					{ className: "modal__close-button", title: defaultToolTip, onClick: closeModal },
					closedModalText
				)
			),
			this.props.children
		);
	}
}

export { MODAL_MODES, Modal };