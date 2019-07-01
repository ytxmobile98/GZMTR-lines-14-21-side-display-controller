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
			destination: DESTINATIONS["不载客"],
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
		}, 4000);

		window.setTimeout(() => {
			that.setState({
				serviceType: SERVICE_TYPES["普通"],
				destination: DESTINATIONS["镇龙"],
			});
		}, 8000);

		window.setTimeout(() => {
			that.setState({
				autoDisplayMode: true,
			});
		}, 12000);
		*/
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

			if ((args.length !== 1) && (args.length !== 2)) {
				showUsageInfo();
			}
			else {
				args.forEach((arg) => {
					if (!((arg instanceof ServiceType) || (arg instanceof Station))) {
						showUsageInfo();
					}
				});
			}

			return true;
		};

		const that = this;

		if (checkUpdateArgs(...args)) {

			args.forEach((arg) => {
				if (arg instanceof ServiceType) {
					that.setState({
						serviceType: arg,
					});
				}
				else if (arg instanceof Station) {
					that.setState({
						destination: arg,
					});
				}
				else {
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
						ref={this.outputLED}
						serviceType={this.state.serviceType}
						destination={this.state.destination}
						showContent={showContent}
					/>
				</div>

				<div className="controller__center">

					<div className="status__container">

						{/* Display mode status */}
						<StatusGridContainer>
							<StatusCell
								header="左侧"
								status={this.state.leftDisplay ? "开" : "关"}
							/>
							<StatusCell
								header="显示模式"
								status={this.state.autoDisplayMode ? "自动" : "手动"}
							/>
							<StatusCell
								header="右侧"
								status={this.state.rightDisplay ? "开" : "关"}
							/>
						</StatusGridContainer>

						{/* Destination status */}
						<StatusGridContainer>
							<StatusCell
								header="线路"
								status={this.state.line}
							/>
							<StatusCell
								header="目的地"
								status={this.state.destination.Chinese}
							/>
							<StatusCell
								header="车种"
								status={this.state.serviceType.Chinese}
							/>
						</StatusGridContainer>

					</div>

					<div className="master-buttons__container">

						<button
							className="master-buttons"
							onClick={()=>{openModal("setDisplayMode");}}
						>
							开启/关闭显示屏
						</button>

						<button
							className="master-buttons"
							onClick={()=>{openModal("setDestination");}}
						>
							更改目的地/车种
						</button>

					</div>

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
					>

						{this.state.modalMode === MODAL_MODES.setDisplayMode ?
							<Dialog
								title="开启/关闭显示屏"
								onClose={closeModal}
							>
							</Dialog>
							: null
						}

						{this.state.modalMode === MODAL_MODES.setDestination ?
							<Dialog
								title="选择目的地"
								onClose={closeModal}
							>
							</Dialog>
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
