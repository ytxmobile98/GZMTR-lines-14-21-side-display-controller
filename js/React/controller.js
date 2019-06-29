"use strict";

import { TypeChecker } from "../type-checker.js";
import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";

import { MODAL_MODES, Modal } from "./modal.js";
import { Dialog } from "./dialog.js";

class Controller extends React.Component {

	constructor(props) {
		super(props);

		const that = this;
		that.outputLED = React.createRef();
		that.state = {
			modalMode: MODAL_MODES.standby
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
			modalMode: MODAL_MODES[modalName] || MODAL_MODES.standby
		});
	}

	closeModal() {
		const that = this;
		that.setState({
			modalMode: null
		});
		that.resetTimeout();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "controller" },
			React.createElement(
				"div",
				{ className: "controller__top" },
				React.createElement(LED, { ref: this.outputLED })
			),
			React.createElement(
				"div",
				{ className: "controller__center" },
				React.createElement(
					"div",
					{ className: "master-buttons__container" },
					React.createElement(
						"button",
						{ className: "master-buttons" },
						"\u5F00\u542F/\u5173\u95ED\u663E\u793A\u5C4F"
					),
					React.createElement(
						"button",
						{ className: "master-buttons" },
						"\u66F4\u6539\u76EE\u7684\u5730/\u8F66\u79CD"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "controller__bottom" },
				React.createElement(Clock, null),
				React.createElement(
					"div",
					{ className: "controller__bottom-notes" },
					"\u6CE8\u610F\uFF1A\u59821\u5206\u949F\u5185\u65E0\u64CD\u4F5C\uFF0C\u6B64\u8BBE\u5907\u5C06\u8FDB\u5165\u5F85\u673A\u6A21\u5F0F\u3002"
				)
			),
			this.state.modalMode ? React.createElement(Modal, { modalMode: this.state.modalMode,
				onMount: this.clearTimeout.bind(this),
				onUnmount: this.resetTimeout.bind(this),
				onCloseModal: this.closeModal.bind(this)
			}) : null
		);
	}
}

export { Controller };