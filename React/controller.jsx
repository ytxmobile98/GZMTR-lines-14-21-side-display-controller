"use strict";

import { SERVICE_TYPES, DESTINATIONS } from "../data/PROCESSED-LINES-DATA.js";

import { LED } from "./LED.js";
import { Clock } from "./clock.js";

class Controller extends React.Component {

	render() {
		return (
			<div className="controller">
				<div className="controller__top">
					<LED
						showContent={true}
						serviceType={SERVICE_TYPES["不载客"]}
						destination={DESTINATIONS["不载客"]}
					/>
				</div>
				<Clock />
			</div>
		);
	}
}

export { Controller };
