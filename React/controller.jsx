"use strict";

import { TypeChecker } from "../type-checker.js";
import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";

import { MODAL_MODES, Modal } from "./modal.js";

class Controller extends React.Component {

	constructor(props) {
		super(props);

		const that = this;
		that.outputLED = React.createRef();
		that.state = {
			modalMode: MODAL_MODES.standby,
		};
	}

	componentDidMount() {
		const action = () => {
			if (!this.state.modalMode) {
				this.resetTimeout();
			}
		};
		const body = document.body;
		this.bodyClickListener = body.addEventListener("click", action);
		this.bodyKeyUpListener = body.addEventListener("keyup", action);
	}

	componentWillUnmount() {
		const that = this;
		const body = document.body;
		body.removeEventListener("click", that.bodyClickListener);
		body.removeEventListener("keyup", that.bodyKeyUpListener);
	}

	setTimeout() {
		const that = this;
		const timeout = 60 * 1000;
		that.timeout = window.setTimeout(() => {
			that.openModal();
		}, timeout);
	}

	clearTimeout() {
		const that = this;
		window.clearTimeout(that.timeout);
	}

	resetTimeout() {
		this.clearTimeout();
		this.setTimeout();
	}

	openModal(modalName) {
		const that = this;
		TypeChecker.checkOptionalTypeOf(modalName, "string");
		that.setState({
			modalMode: MODAL_MODES[modalName] || MODAL_MODES.standby,
		});
	}

	closeModal() {
		const that = this;
		that.setState({
			modalMode: null,
		});
		that.resetTimeout();
	}

	render() {
		return (
			<div className="controller">

				<div className="controller__top">
					<LED ref={this.outputLED} />
				</div>

				<div className="controller__center">
				</div>

				<div className="controller__bottom">
					<Clock />
					<div className="controller__bottom-notes">
						注意：如1分钟内无操作，此设备将进入待机模式。
					</div>
				</div>

				{this.state.modalMode ?
					<Modal modalMode={this.state.modalMode}
						onMount={this.clearTimeout.bind(this)}
						onUnmount={this.resetTimeout.bind(this)}
						onCloseModal={this.closeModal.bind(this)}
					/>
					: null
				}

			</div>
		);
	}
}

export { Controller };
