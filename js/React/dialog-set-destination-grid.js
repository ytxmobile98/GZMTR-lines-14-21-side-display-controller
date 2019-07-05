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
			filterName: ""
		};

		this.savedData = {
			destination: DESTINATIONS["不载客"],
			defaultServiceType: SERVICE_TYPES["不载客"],
			crossLineServiceType: SERVICE_TYPES["不载客"],

			scrollTops: {
				lineSelector: 0,
				filterSelector: 0,
				destSelector: 0
			}
		};
	}

	saveScrollTop(item, value) {
		// use 0 if converted to NaN
		this.savedData.scrollTops[item] = Number(value) || 0;
	}

	render() {

		const extraLineHeight = true;

		return React.createElement(
			"div",
			{ className: "set-destination-grid__container" },
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--header" },
				"\u7EBF\u8DEF"
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--options-container" },
				React.createElement(RadioItem, {
					name: "line",
					value: "\u4E0D\u8F7D\u5BA2",
					defaultChecked: true,
					extraLineHeight: extraLineHeight,
					text: "\u4E0D\u8F7D\u5BA2",
					key: "\u4E0D\u8F7D\u5BA2"
				}),
				React.createElement(RadioItem, {
					name: "line",
					value: "14\u53F7\u7EBF",
					extraLineHeight: extraLineHeight,
					text: "14\u53F7\u7EBF",
					key: "14\u53F7\u7EBF"
				}),
				React.createElement(RadioItem, {
					name: "line",
					value: "21\u53F7\u7EBF",
					extraLineHeight: extraLineHeight,
					text: "21\u53F7\u7EBF",
					key: "21\u53F7\u7EBF"
				})
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--header" },
				"\u7B5B\u9009\u5217\u8868"
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--options-container" },
				React.createElement(RadioItem, {
					name: "filter",
					value: "\u5168\u90E8",
					defaultChecked: true,
					extraLineHeight: extraLineHeight,
					text: "\u5168\u90E8",
					key: "\u5168\u90E8"
				})
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--header" },
				"\u76EE\u7684\u5730"
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--options-container set-destination-grid__item--destinations" },
				React.createElement(RadioItem, {
					name: "destination",
					value: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					defaultChecked: true,
					extraLineHeight: extraLineHeight,
					text: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					key: "\u4EAC\u6EAA\u5357\u65B9\u533B\u96621"
				}),
				React.createElement(RadioItem, {
					name: "destination",
					value: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					extraLineHeight: extraLineHeight,
					text: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					key: "\u4EAC\u6EAA\u5357\u65B9\u533B\u96622"
				}),
				React.createElement(RadioItem, {
					name: "destination",
					value: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					extraLineHeight: extraLineHeight,
					text: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					key: "\u4EAC\u6EAA\u5357\u65B9\u533B\u96623"
				}),
				React.createElement(RadioItem, {
					name: "destination",
					value: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					extraLineHeight: extraLineHeight,
					text: "\u4EAC\u6EAA\u5357\u65B9\u533B\u9662",
					key: "\u4EAC\u6EAA\u5357\u65B9\u533B\u96624"
				})
			)
		);
	}
}

export { SetDestinationGrid };