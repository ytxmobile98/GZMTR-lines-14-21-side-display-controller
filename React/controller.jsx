"use strict";

import { TypeChecker } from "../type-checker.js";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";
import { ServiceType } from "../data/service-type-classes.js";
import { Station } from "../data/station-classes.js";

import { showUsageInfo, checkUpdateInfo, LED } from "./LED.js";
import { Clock } from "./clock.js";
import { DisplayModeStatusCell, DisplayModeStatus } from "./controller-status-display-mode.js";

import { MODAL_MODES } from "./modal-modes.js";
import { Modal } from "./modal.js";
import { Dialog } from "./dialog.js";

class StatusDisplay extends React.PureComponent {
	render() {
		return (
			<div className="status__container">
				{this.props.children}
			</div>
		);
	}
}


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

		const that = this;
		const outputLED = that.outputLED.current;

		if (checkUpdateInfo(...args)) {
			outputLED.updateDisplay(...args);

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

		return (
			<div className="controller">

				<div className="controller__top">
					<LED ref={this.outputLED} />
				</div>

				<div className="controller__center">

					<div className="status__container">

						<DisplayModeStatus>
							<DisplayModeStatusCell
								header="左侧"
								status={this.state.leftDisplay ? "开" : "关"}
							/>
							<DisplayModeStatusCell
								header="当前显示模式"
								status={this.state.autoDisplayMode ? "自动" : "手动"}
							/>
							<DisplayModeStatusCell
								header="右侧"
								status={this.state.rightDisplay ? "开" : "关"}
							/>
						</DisplayModeStatus>

						<div className="status__destination">
						</div>
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
