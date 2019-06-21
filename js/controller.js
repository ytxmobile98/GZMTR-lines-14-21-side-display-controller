"use strict";

import { SERVICE_TYPES, SERVICES } from "./data/SERVICES.js";
import { DESTINATIONS } from "./data/DESTINATIONS.js";
import { LED } from "./LED.js";

console.log(SERVICE_TYPES, SERVICES.get("不载客").get("全部"), DESTINATIONS);

class Controller extends React.Component {

	render() {
		return React.createElement(
			"div",
			{ className: "controller" },
			React.createElement(LED, {
				showContent: true,
				serviceType: SERVICE_TYPES["不载客"],
				destination: DESTINATIONS["不载客"]["不载客"]
			})
		);
	}
}

export { Controller };