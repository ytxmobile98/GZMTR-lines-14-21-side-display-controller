"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/line-info-wrapper.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";
import { StatusCell, StatusGridContainer, StatusContainer } from "./status-grid.js";

import { defaultModalMode, Modal } from "./modal.js";
import { SetDisplayModeDialog } from "./dialog-set-display-mode.js";
import { SetServiceDialog } from "./dialog-set-service.js";

class Controller extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			// modal mode
			modalMode: defaultModalMode,

			// current display mode
			autoDisplayMode: true,
			leftDisplay: true,
			rightDisplay: true,

			// current destination information
			line: "不载客",
			// serviceType: LineInfoWrapper.getDefaultServiceType(),
			// destination: LineInfoWrapper.getDefaultDest(),
			serviceType: LineInfoWrapper.getServiceType("快速"),
			destination: LineInfoWrapper.getDestination("镇龙")
		};
	}

	updateDisplayMode(auto, left, right) {
		this.setState({
			autoDisplayMode: !!auto,
			leftDisplay: !!left,
			rightDisplay: !!right
		});
	}

	updateOutputDisplay(line, serviceType, destination) {

		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		TypeChecker.checkInstanceOf(destination, Station);

		this.setState({
			line: String(line || ""),
			serviceType: serviceType,
			destination: destination
		});
	}

	componentDidMount() {
		const action = () => {
			if (!this.state.modalMode) {
				this.resetTimeout();
			}
		};
		const body = document.body;
		this.bodyClickListener = body.addEventListener("click", action);
		this.bodyKeyDownListener = body.addEventListener("keydown", action);
	}

	componentWillUnmount() {
		const body = document.body;
		body.removeEventListener("click", this.bodyClickListener);
		body.removeEventListener("keydown", this.bodyKeyDownListener);
	}

	setTimeout() {
		const timeout = 60 * 1000;
		this.timeout = window.setTimeout(() => {
			this.openModal();
		}, timeout);
	}

	clearTimeout() {
		window.clearTimeout(this.timeout);
	}

	resetTimeout() {
		this.clearTimeout();
		this.setTimeout();
	}

	openModal(modalMode) {
		TypeChecker.checkOptionalTypeOf(modalMode, "string");
		this.setState({
			modalMode: modalMode || defaultModalMode
		});
	}

	closeModal() {
		this.setState({
			modalMode: null
		});
		this.resetTimeout();
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
					serviceType: this.state.serviceType,
					destination: this.state.destination,
					showContent: showContent
				})
			),
			React.createElement(
				"div",
				{ className: "controller__center" },
				React.createElement(
					StatusContainer,
					null,
					React.createElement(
						StatusGridContainer,
						{ sectionHeader: "\u65B9\u5411\u5E55\u663E\u793A\u72B6\u6001" },
						React.createElement(StatusCell, {
							itemHeader: "\u5DE6\u4FA7",
							itemText: this.state.leftDisplay ? "开" : "关",
							dataTag: "status-display-switch",
							dataValue: this.state.leftDisplay ? "开" : "关"
						}),
						React.createElement(StatusCell, {
							itemHeader: "\u663E\u793A\u6A21\u5F0F",
							itemText: this.state.autoDisplayMode ? "自动" : "手动",
							dataTag: "status-display-mode",
							dataValue: this.state.autoDisplayMode ? "自动" : "手动"
						}),
						React.createElement(StatusCell, {
							itemHeader: "\u53F3\u4FA7",
							itemText: this.state.rightDisplay ? "开" : "关",
							dataTag: "status-display-switch",
							dataValue: this.state.rightDisplay ? "开" : "关"
						})
					),
					React.createElement(
						StatusGridContainer,
						{ sectionHeader: "\u5217\u8F66\u8FD0\u8425\u72B6\u6001" },
						React.createElement(StatusCell, {
							itemHeader: "\u7EBF\u8DEF",
							itemText: this.state.line,
							dataTag: "status-line",
							dataValue: this.state.line
						}),
						React.createElement(StatusCell, {
							itemHeader: "\u76EE\u7684\u5730",
							itemText: this.state.destination.Chinese
						}),
						React.createElement(StatusCell, {
							itemHeader: "\u8F66\u79CD",
							itemText: this.state.serviceType.Chinese,
							dataTag: "status-service-type",
							dataValue: this.state.serviceType.Chinese
						})
					)
				),
				React.createElement(
					"div",
					{ className: "master-buttons__container" },
					React.createElement(
						"button",
						{
							className: "master-button action-button",
							onClick: () => {
								openModal("setDisplayMode");
							}
						},
						"\u5F00\u542F/\u5173\u95ED\u65B9\u5411\u5E55"
					),
					React.createElement(
						"button",
						{
							className: "master-button action-button",
							onClick: () => {
								openModal("setService");
							},
							disabled: true
						},
						"\u66F4\u65B0\u8FD0\u8425\u4FE1\u606F"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "controller__bottom" },
				React.createElement(Clock, null),
				React.createElement(
					"div",
					{ className: "warning-notes" },
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
				this.state.modalMode === "setDisplayMode" ? React.createElement(SetDisplayModeDialog, {
					updateDisplayMode: (auto, left, right) => {
						this.updateDisplayMode(auto, left, right);
						closeModal();
					},
					onClose: closeModal,

					autoDisplayMode: this.state.autoDisplayMode,
					leftDisplay: this.state.leftDisplay,
					rightDisplay: this.state.rightDisplay
				}) : null,
				this.state.modalMode === "setService" ? React.createElement(SetServiceDialog, {
					title: "\u9009\u62E9\u76EE\u7684\u5730",

					updateOutputDisplay: (line, serviceType, destination) => {
						this.updateOutputDisplay(line, serviceType, destination);
						closeModal();
					},
					onClose: closeModal,

					line: this.state.line,
					serviceType: this.state.serviceType,
					destination: this.state.destination
				}) : null
			) : null
		);
	}
}

export { Controller };