"use strict";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";
import { LED } from "./LED.js";

class Controller extends React.Component {

	render() {
		return (
			<div className="controller">
				<LED
					showContent={true}
					serviceType={SERVICE_TYPES["不载客"]}
					destination={DESTINATIONS["不载客"]}
				/>
			</div>
		);
	}
}

export { Controller };
