"use strict";

// Type checker
import { TypeChecker } from "../type-checker.js";

// Train service data
import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/LINES-DATA.js";

// Controller top area
import { LED } from "./LED.js";
// Controller center area
import { MonitorArea, DisplayModeGrid, TrainInfoGrid } from "./monitor-grids.js";
import { MasterButton, MasterButtonsContainer } from "./master-buttons.js";
// Controller bottom area
import { Clock } from "./clock.js";
import { WarningNote } from './warning-note.js';
import { UsefulLinks } from "./useful-links.js";

// Controller modal dialogs
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

				{/* Center area: the monitoring area and master buttons */}
				<div className="controller__center">

					{/* Monitoring area */}
					<MonitorArea>
						<DisplayModeGrid
							autoDisplayMode={this.state.autoDisplayMode}
							leftDisplay={this.state.leftDisplay}
							rightDisplay={this.state.rightDisplay}
						/>
						<TrainInfoGrid
							line={this.state.line}
							destination={this.state.destination}
							serviceType={this.state.serviceType}
						/>
					</MonitorArea>

					{/* Master buttons */}
					<MasterButtonsContainer>
						<MasterButton
							onClick={() => {
								openModal("setDisplayMode");
							}}
							text="开启/关闭方向幕"
						/>
						<MasterButton
							onClick={() => {
								openModal("setService");
							}}
							text="更改目的地/车种"
						/>
					</MasterButtonsContainer>

				</div>

				{/* Bottom area: clock, warning note, and useful links */}
				<div className="controller__bottom">
					<Clock />
					<WarningNote content="注意：如1分钟内无操作，此设备将进入待机模式。" />
					<UsefulLinks />
				</div>

				{/* Modal dialogs */}
				{this.state.modalMode ?

					<Modal modalMode={this.state.modalMode}
						onMount={this.clearTimeout.bind(this)}
						onUnmount={this.resetTimeout.bind(this)}
						onCloseModal={this.closeModal.bind(this)}
					>

						{/* Set display mode */}
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

						{/* Set train service information */}
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
