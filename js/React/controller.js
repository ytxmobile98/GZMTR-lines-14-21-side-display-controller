"use strict";

import { TypeChecker } from "../type-checker.js";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";
import { ServiceType } from "../data/service-type-classes.js";
import { Station } from "../data/station-classes.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";
import { StatusCell, StatusGridContainer } from "./controller-status.js";

import { MODAL_MODES } from "./modal-modes.js";
import { Modal } from "./modal.js";
import { Dialog } from "./dialog.js";

class Controller extends React.Component {

	constructor(props) {
		super(props);

		const that = this;
		that.outputLED = React.createRef();
		that.state = {
			modalMode: MODAL_MODES.standby,

			// current display mode
			leftDisplay: true,
			rightDisplay: true,
			autoDisplayMode: true,

			// current destination information
			line: "不载客",
			serviceType: SERVICE_TYPES["不载客"],
			destination: DESTINATIONS["不载客"]
		};

		/*
  window.setTimeout(() => {
  	that.setState({
  		serviceType: SERVICE_TYPES["特别服务"],
  		destination: DESTINATIONS["嘉禾望岗"],
  			leftDisplay: false,
  		rightDisplay: false,
  		autoDisplayMode: false,
  	});
  	that.updateLine("14号线");
  }, 4000);
  	window.setTimeout(() => {
  	that.setState({
  		serviceType: SERVICE_TYPES["普通"],
  		destination: DESTINATIONS["镇龙"],
  	});
  	that.updateLine("21号线");
  }, 8000);
  	window.setTimeout(() => {
  	that.setState({
  		autoDisplayMode: true,
  	});
  }, 12000);*/
	}

	updateLine(line) {
		TypeChecker.checkTypeOf(line, "string");
		this.setState({
			line: line
		});
	}

	/* Usage:
 Two parameters:
 	updateDisplay(newServiceType, newDestination) OR
 	updateDisplay(newDestination, newServiceType)
 	One parameter:
 	updateDisplay(newServiceType) OR
 	updateDisplay(newDestination)
 */
	updateOutputDisplay(...args) {

		const showUsageInfo = () => {
			throw new TypeError(`Usage:

				Two parameters:
					updateOutputDisplay(newServiceType, newDestination) OR
					updateOutputDisplay(newDestination, newServiceType)

				One parameter:
					updateOutputDisplay(newServiceType) OR
					updateOutputDisplay(newDestination)
			`);
		};

		const checkUpdateArgs = (...args) => {

			if (args.length !== 1 && args.length !== 2) {
				showUsageInfo();
			} else {
				args.forEach(arg => {
					if (!(arg instanceof ServiceType || arg instanceof Station)) {
						showUsageInfo();
					}
				});
			}

			return true;
		};

		const that = this;

		if (checkUpdateArgs(...args)) {

			args.forEach(arg => {
				if (arg instanceof ServiceType) {
					that.setState({
						serviceType: arg
					});
				} else if (arg instanceof Station) {
					that.setState({
						destination: arg
					});
				} else {
					showUsageInfo();
				}
			});
		}
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

		const setTimeout = this.setTimeout.bind(this);
		const clearTimeout = this.clearTimeout.bind(this);
		const resetTimeout = this.resetTimeout.bind(this);

		const openModal = this.openModal.bind(this);
		const closeModal = this.closeModal.bind(this);

		const showContent = this.state.autoDisplayMode || this.state.leftDisplay || this.state.rightDisplay;

		return React.createElement(
			"div",
			{ className: "controller" },
			React.createElement(
				"div",
				{ className: "controller__top" },
				React.createElement(LED, {
					ref: this.outputLED,
					serviceType: this.state.serviceType,
					destination: this.state.destination,
					showContent: showContent
				})
			),
			React.createElement(
				"div",
				{ className: "controller__center" },
				React.createElement(
					"div",
					{ className: "status__container" },
					React.createElement(
						StatusGridContainer,
						null,
						React.createElement(StatusCell, {
							header: "\u5DE6\u4FA7",
							status: this.state.leftDisplay ? "开" : "关"
						}),
						React.createElement(StatusCell, {
							header: "\u663E\u793A\u6A21\u5F0F",
							status: this.state.autoDisplayMode ? "自动" : "手动"
						}),
						React.createElement(StatusCell, {
							header: "\u53F3\u4FA7",
							status: this.state.rightDisplay ? "开" : "关"
						})
					),
					React.createElement(
						StatusGridContainer,
						null,
						React.createElement(StatusCell, {
							header: "\u7EBF\u8DEF",
							status: this.state.line
						}),
						React.createElement(StatusCell, {
							header: "\u76EE\u7684\u5730",
							status: this.state.destination.Chinese
						}),
						React.createElement(StatusCell, {
							header: "\u8F66\u79CD",
							status: this.state.serviceType.Chinese
						})
					)
				),
				React.createElement(
					"div",
					{ className: "master-buttons__container" },
					React.createElement(
						"button",
						{
							className: "master-buttons",
							onClick: () => {
								openModal("setDisplayMode");
							}
						},
						"\u5F00\u542F/\u5173\u95ED\u663E\u793A\u5C4F"
					),
					React.createElement(
						"button",
						{
							className: "master-buttons",
							onClick: () => {
								openModal("setDestination");
							}
						},
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
			this.state.modalMode ? React.createElement(
				Modal,
				{ modalMode: this.state.modalMode,
					onMount: this.clearTimeout.bind(this),
					onUnmount: this.resetTimeout.bind(this),
					onCloseModal: this.closeModal.bind(this)
				},
				this.state.modalMode === MODAL_MODES.setDisplayMode ? React.createElement(Dialog, {
					title: "\u5F00\u542F/\u5173\u95ED\u663E\u793A\u5C4F",
					onClose: closeModal
				}) : null,
				this.state.modalMode === MODAL_MODES.setDestination ? React.createElement(Dialog, {
					title: "\u9009\u62E9\u76EE\u7684\u5730",
					onClose: closeModal
				}) : null
			) : null
		);
	}
}

export { Controller };