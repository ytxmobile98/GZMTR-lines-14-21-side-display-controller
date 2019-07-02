"use strict";

import { TypeChecker } from "../type-checker.js";

import { MODAL_MODES } from "./modal-modes.js";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: props.modalMode,
		};
		TypeChecker.checkOptionalTypeOf(props.modalMode, "symbol");
	}

	closeModal() {
		this.props.onCloseModal();
	}

	componentDidMount() {
		const that = this;
		that.props.onMount();
		that.escListener = document.body.addEventListener("keydown", (event) => {
			if (event.key === "Escape" || event.key === "Esc") {
				that.closeModal();
			}
		});
	}

	componentWillUnmount() {
		const that = this;
		this.props.onUnmount();
		document.body.removeEventListener("keydown", that.escListener);
	}

	render() {

		const defaultToolTip = "关闭遮罩";
		const closedModalText = (this.state.modalMode === MODAL_MODES.standby) ? "当前处于待机模式，点击或按Esc以恢复" : defaultToolTip;

		const closeModal = this.closeModal.bind(this);

		return (
			<div className="modal">
				<div className="modal__background">
					<button className="modal__close-button" title={defaultToolTip} onClick={closeModal}>
						{closedModalText}
					</button>
				</div>

				{this.props.children}

			</div>
		);
	}
}

export { MODAL_MODES, Modal };
