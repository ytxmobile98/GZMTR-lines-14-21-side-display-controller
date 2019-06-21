"use strict";

import { ServiceType } from "./data/service-type-classes.js";
import { Station } from "./data/station-classes.js";
import { LED } from "./LED.js";

ReactDOM.render(React.createElement(LED, {
	showContent: true,
	serviceType: new ServiceType("不载客", "Not in Service")
	//destination={new Station("知识城", "Sino-Singapore Guangzhou Knowledge City")}
	, destination: new Station("不载客列车", "Not in Service")
}), document.getElementById("js-root"));