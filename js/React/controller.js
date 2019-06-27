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
			modalMode: "standby"
		};
	}

	setTimer() {}

	clearTimer() {}

	resetTimer() {}

	render() {
		return React.createElement(
			"div",
			{ className: "controller" },
			React.createElement(
				"div",
				{ className: "controller__top" },
				React.createElement(LED, { ref: this.outputLED,
					serviceType: SERVICE_TYPES["快速"],
					destination: DESTINATIONS["镇龙"]
				})
			),
			React.createElement("div", { className: "controller__center" }),
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
			React.createElement(Modal, null)
		);
	}
}

export { Controller };