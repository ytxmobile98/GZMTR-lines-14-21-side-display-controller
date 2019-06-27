"use strict";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";

import { Modal } from "./modal.js";

class Controller extends React.Component {

	constructor(props) {
		super(props);
		this.outputLED = React.createRef();
		this.state = {
			modalMode: "standby",
		}
	}

	setTimer() {

	}

	clearTimer() {

	}

	resetTimer() {

	}

	render() {
		return (
			<div className="controller">

				<div className="controller__top">
					<LED ref={this.outputLED}
						serviceType={SERVICE_TYPES["快速"]}
						destination={DESTINATIONS["镇龙"]}
					/>
				</div>

				<div className="controller__center">
				</div>

				<div className="controller__bottom">
					<Clock />
					<div className="controller__bottom-notes">
						注意：如1分钟内无操作，此设备将进入待机模式。
					</div>
				</div>

				<Modal />

			</div>
		);
	}
}

export { Controller };
