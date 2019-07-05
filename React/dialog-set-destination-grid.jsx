"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, SERVICE_TYPES, Station, DESTINATIONS, LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { Filter } from "../data/filter-classes.js";

import { RadioGroup, RadioItem } from "./radio-group.js";

class SetDestinationGrid extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			line: String(props.line || ""),
			filterName: "",
		}

		this.savedData = {
			destination: DESTINATIONS["不载客"],
			defaultServiceType: SERVICE_TYPES["不载客"],
			crossLineServiceType: SERVICE_TYPES["不载客"],

			scrollTops: {
				lineSelector: 0,
				filterSelector: 0,
				destSelector: 0,
			},
		}
	}

	saveScrollTop(item, value) {
		// use 0 if converted to NaN
		this.savedData.scrollTops[item] = Number(value) || 0;
	}

	render() {

		const extraLineHeight = true;

		return (
			<div className="set-destination-grid__container">

				<div className="set-destination-grid__item set-destination-grid__item--header">线路</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container">
					<RadioItem
						name="line"
						value="不载客"
						defaultChecked={true}
						extraLineHeight={extraLineHeight}
						text="不载客"
						key="不载客"
					/>
					<RadioItem
						name="line"
						value="14号线"
						extraLineHeight={extraLineHeight}
						text="14号线"
						key="14号线"
					/>
					<RadioItem
						name="line"
						value="21号线"
						extraLineHeight={extraLineHeight}
						text="21号线"
						key="21号线"
					/>
				</div>

				<div className="set-destination-grid__item set-destination-grid__item--header">筛选列表</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container">
					<RadioItem
						name="filter"
						value="全部"
						defaultChecked={true}
						extraLineHeight={extraLineHeight}
						text="全部"
						key="全部"
					/>
				</div>

				<div className="set-destination-grid__item set-destination-grid__item--header">目的地</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container set-destination-grid__item--destinations">
					<RadioItem
						name="destination"
						value="京溪南方医院"
						defaultChecked={true}
						extraLineHeight={extraLineHeight}
						text="京溪南方医院"
						key="京溪南方医院1"
					/>
					<RadioItem
						name="destination"
						value="京溪南方医院"
						extraLineHeight={extraLineHeight}
						text="京溪南方医院"
						key="京溪南方医院2"
					/>
					<RadioItem
						name="destination"
						value="京溪南方医院"
						extraLineHeight={extraLineHeight}
						text="京溪南方医院"
						key="京溪南方医院3"
					/>
					<RadioItem
						name="destination"
						value="京溪南方医院"
						extraLineHeight={extraLineHeight}
						text="京溪南方医院"
						key="京溪南方医院4"
					/>
				</div>

			</div>
		);
	}
}

export { SetDestinationGrid };
