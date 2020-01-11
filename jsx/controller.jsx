"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/LINES-DATA.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";
import { StatusCell, StatusGridContainer, StatusContainer } from "./status-grid.js";
import { UsefulLinks } from "./useful-links.js";

import { defaultModalMode, Modal } from "./modal.js";
import { SetDisplayModeDialog } from "./dialog-set-display-mode.js";
import { SetServiceDialog } from "./dialog-set-service.js";

// The main component class for the controller

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
			line: LineInfoWrapper.getDefaultLine(),
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

				{/* Top area: the LED display */}
				<div className="controller__top">
					<LED
						serviceType={this.state.serviceType}
						destination={this.state.destination}
						showContent={showContent}
					/>
				</div>

				{/* Center area: the monitoring area */}
				<div className="controller__center">

					<StatusContainer multiCols={true}>

						{/* Destination sign display status: on / off, automatic / manual */}
						<StatusGridContainer sectionHeader="方向幕显示状态">
							<StatusCell
								itemName="显示模式"
								itemData={this.state.autoDisplayMode ? "自动" : "手动"}
								dataTag="status-display-mode"
								dataValue={this.state.autoDisplayMode ? "自动" : "手动"}
							/>
							<StatusCell
								itemName="左侧"
								itemData={this.state.leftDisplay ? "开" : "关"}
								dataTag="status-display-switch"
								dataValue={this.state.leftDisplay ? "开" : "关"}
							/>
							<StatusCell
								itemName="右侧"
								itemData={this.state.rightDisplay ? "开" : "关"}
								dataTag="status-display-switch"
								dataValue={this.state.rightDisplay ? "开" : "关"}
							/>
						</StatusGridContainer>

						{/* Train status: line, destination, service type */}
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
								dataTag="status-destination"
								dataValue={this.state.destination.Chinese}
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
							className="master-button button--action"
							onClick={()=>{openModal("setDisplayMode");}}
						>
							开启/关闭方向幕
						</button>

						<button
							className="master-button button--action"
							onClick={()=>{openModal("setService");}}
						>
							更改目的地/车种
						</button>

					</div>

				</div>

				{/* Bottom area: clock, note, and useful links */}
				<div className="controller__bottom">

					<Clock />

					<div className="notes--warning">
						注意：如1分钟内无操作，此设备将进入待机模式。
					</div>

					<UsefulLinks />

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
