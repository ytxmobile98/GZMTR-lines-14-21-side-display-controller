"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/line-info-wrapper.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";
import { StatusCell, StatusGridContainer, StatusContainer } from "./status-grid.js";
import { LinkButton, LinkButtonsContainer } from "./link-buttons.js";

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
			serviceType: LineInfoWrapper.getDefaultServiceType(),
			destination: LineInfoWrapper.getDefaultDest(),
		};

	}

	updateDisplayMode(auto, left, right) {
		this.setState({
			autoDisplayMode: !!auto,
			leftDisplay: !!left,
			rightDisplay: !!right,
		});
	}

	updateOutputDisplay(line, serviceType, destination) {

		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		TypeChecker.checkInstanceOf(destination, Station);

		this.setState({
			line: String(line || ""),
			serviceType: serviceType,
			destination: destination,
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
			modalMode: modalMode || defaultModalMode,
		});
	}

	closeModal() {
		this.setState({
			modalMode: null,
		});
		this.resetTimeout();
	}

	render() {

		const setTimeout = this.setTimeout.bind(this);
		const clearTimeout = this.clearTimeout.bind(this);
		const resetTimeout = this.resetTimeout.bind(this);

		const openModal = this.openModal.bind(this);
		const closeModal = this.closeModal.bind(this);

		const showContent = (this.state.autoDisplayMode) || ((this.state.leftDisplay) || (this.state.rightDisplay));

		return (
			<div className="controller">

				<div className="controller__top">
					<LED
						serviceType={this.state.serviceType}
						destination={this.state.destination}
						showContent={showContent}
					/>
				</div>

				<div className="controller__center">

					<StatusContainer multiCols={true}>

						{/* Display mode status */}
						<StatusGridContainer sectionHeader="方向幕显示状态">
							<StatusCell
								itemName="左侧"
								itemData={this.state.leftDisplay ? "开" : "关"}
								dataTag="status-display-switch"
								dataValue={this.state.leftDisplay ? "开" : "关"}
							/>
							<StatusCell
								itemName="显示模式"
								itemData={this.state.autoDisplayMode ? "自动" : "手动"}
								dataTag="status-display-mode"
								dataValue={this.state.autoDisplayMode ? "自动" : "手动"}
							/>
							<StatusCell
								itemName="右侧"
								itemData={this.state.rightDisplay ? "开" : "关"}
								dataTag="status-display-switch"
								dataValue={this.state.rightDisplay ? "开" : "关"}
							/>
						</StatusGridContainer>

						{/* Destination status */}
						<StatusGridContainer sectionHeader="列车运营状态">
							<StatusCell
								itemName="线路"
								itemData={this.state.line}
								dataTag="status-line"
								dataValue={this.state.line}
								sidePadding={true}
							/>
							<StatusCell
								itemName="目的地"
								itemData={this.state.destination.Chinese}
							/>
							<StatusCell
								itemName="车种"
								itemData={this.state.serviceType.Chinese}
								dataTag="status-service-type"
								dataValue={this.state.serviceType.Chinese}
								sidePadding={true}
							/>
						</StatusGridContainer>

					</StatusContainer>

					<div className="master-buttons__container">

						<button
							className="master-button action-button"
							onClick={()=>{openModal("setDisplayMode");}}
						>
							开启/关闭方向幕
						</button>

						<button
							className="master-button action-button"
							onClick={()=>{openModal("setService");}}
						>
							更改目的地/车种
						</button>

					</div>

				</div>

				<div className="controller__bottom">

					<Clock />

					<div className="warning-notes">
						注意：如1分钟内无操作，此设备将进入待机模式。
					</div>

					<LinkButtonsContainer>
						<LinkButton
							url="https://github.com/ytx21cn/GZMTR-lines-14-21-side-display-controller"
							image="icons/GitHub.svg"
							title="在GitHub上查看源代码"
						/>
						<LinkButton
							url="https://developer.mozilla.org"
							image="icons/MDN.svg"
							title="MDN Web文档"
						/>
						<LinkButton
							url="https://reactjs.org/"
							image="icons/React.svg"
							title="React"
						/>
						<LinkButton
							url="https://material.io/tools/color/"
							image="icons/material-color-tools-logo.svg"
							title="Google Material Color Tools"
						/>
						<LinkButton
							url="http://www.gzmtr.com"
							image="icons/GZMTR.svg"
							title="广州地铁"
						/>
					</LinkButtonsContainer>

				</div>

				{this.state.modalMode ?

					<Modal modalMode={this.state.modalMode}
						onMount={this.clearTimeout.bind(this)}
						onUnmount={this.resetTimeout.bind(this)}
						onCloseModal={this.closeModal.bind(this)}
					>

						{this.state.modalMode === "setDisplayMode" ?
							<SetDisplayModeDialog
								updateDisplayMode={(auto, left, right) => {
									this.updateDisplayMode(auto, left, right);
									closeModal();
								}}
								onClose={closeModal}

								autoDisplayMode={this.state.autoDisplayMode}
								leftDisplay={this.state.leftDisplay}
								rightDisplay={this.state.rightDisplay}
							/>
							: null
						}

						{this.state.modalMode === "setService" ?
							<SetServiceDialog
								title="选择目的地"

								updateOutputDisplay={(line, serviceType, destination) => {
									this.updateOutputDisplay(line, serviceType, destination);
									closeModal();
								}}
								onClose={closeModal}

								line={this.state.line}
								serviceType={this.state.serviceType}
								destination={this.state.destination}
							/>
							: null
						}

					</Modal>

					: null
				}

			</div>
		);
	}
}

export { Controller };
