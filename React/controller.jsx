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
				<div className="controller__center"></div>
				<div className="controller__bottom">
					<Clock />
					<div className="controller__bottom-notes">
						注意：如1分钟内无操作，此设备将进入待机模式。
					</div>
				</div>
			</div>
		);
	}
}

export { Controller };
