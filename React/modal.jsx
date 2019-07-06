"use strict";

import { TypeChecker } from "../type-checker.js";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalMode: String(props.modalMode || "standby"),
		};
	}

	close() {
		this.props.onCloseModal();
	}

	componentDidMount() {
		this.props.onMount();
		this.escListener = document.body.addEventListener("keydown", (event) => {
			if (event.key === "Escape" || event.key === "Esc") {
				this.close();
			}
		});
	}

	componentWillUnmount() {
		this.props.onUnmount();
		document.body.removeEventListener("keydown", this.escListener);
	}

	render() {

		const defaultToolTip = "关闭遮罩";
		const closedModalText = (this.state.modalMode === "standby") ? "当前处于待机模式，点击或按Esc以恢复" : defaultToolTip;

		const closeModal = this.close.bind(this);

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

export { Modal };
