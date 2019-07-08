"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, SERVICE_TYPES, Station, DESTINATIONS, LineInfo, LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { Filter } from "../data/filter-classes.js";

import { RadioGroup, RadioItem } from "./radio-group.js";
import { LineSelector } from "./dialog-selector-line.js";
import { FilterSelector } from "./dialog-selector-filter.js";
import { DestSelector } from "./dialog-selector-destination.js";

class SetDestinationGrid extends React.Component {
	constructor(props) {
		super(props);

		this.initialLine = props.initialLine;

		TypeChecker.checkOptionalInstanceOf(props.destination, Station);
		TypeChecker.checkOptionalInstanceOf(props.serviceType, ServiceType);

		this.state = {
			line: String(props.line || ""),
			filterName: String(props.filterName || ""),
			destination: props.destination || DESTINATIONS["不载客"],
			serviceType: props.serviceType || SERVICE_TYPES["不载客"]
		};

		this.lineSelRef = React.createRef();
		this.filterSelRef = React.createRef();
		this.destSelRef = React.createRef();
	}

	updateLine(line) {
		this.setState({
			line: String(line || "")
		});
	}

	updateFilterName(filterName) {
		const initialLine = this.initialLine;
		const initialLineInfo = LINES_INFO.get(initialLine);
		TypeChecker.checkInstanceOf(initialLineInfo, LineInfo);

		const currentLine = this.state.line;
		const currentLineInfo = LINES_INFO.get(currentLine);
		TypeChecker.checkInstanceOf(currentLineInfo, LineInfo);

		const filter = LINES_INFO.get(currentLine).filters.get(filterName);
		TypeChecker.checkInstanceOf(filter, Filter);

		this.setState({
			filterName: String(filterName || "")
		});

		if (!initialLineInfo.isPassengerService || initialLineInfo === currentLineInfo) {
			this.setState({
				serviceType: filter.serviceType
			});
		} else {
			this.setState({
				serviceType: filter.crossLineServiceType
			});
		}
	}

	updateDestination(destination) {
		TypeChecker.checkInstanceOf(destination, Station);
		this.setState({
			destination: destination
		});
	}

	saveSelections() {
		this.props.saveSelections(this.state.line, this.state.filterName, this.state.destination, this.state.serviceType);
	}

	saveScrollTops() {
		this.props.saveScrollTops(this.lineSelRef.current.scrollTop, this.filterSelRef.current.scrollTop, this.destSelRef.current.scrollTop);
	}

	componentDidMount() {
		const line = String(this.props.line || "");
		if (line) {
			this.updateLine(line);
		}

		const filterName = String(this.props.filterName || "");
		if (filterName) {
			this.updateFilterName(filterName);
		}
	}

	componentWillUnmount() {
		this.saveSelections();
		this.saveScrollTops();
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
				{ className: "set-destination-grid__item set-destination-grid__item--options-container",
					ref: this.lineSelRef
				},
				React.createElement(LineSelector, {
					line: this.state.line,
					updateLine: this.updateLine.bind(this)
				})
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--header" },
				"\u7B5B\u9009\u5217\u8868"
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--options-container",
					ref: this.filterSelRef
				},
				React.createElement(FilterSelector, {
					line: this.state.line,
					filterName: this.state.filterName,
					updateFilterName: this.updateFilterName.bind(this)
				})
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--header" },
				"\u76EE\u7684\u5730"
			),
			React.createElement(
				"div",
				{ className: "set-destination-grid__item set-destination-grid__item--options-container set-destination-grid__item--destinations",
					ref: this.destSelRef
				},
				React.createElement(DestSelector, {
					line: this.state.line,
					filterName: this.state.filterName,
					destination: this.state.destination,
					updateDestination: this.updateDestination.bind(this)
				})
			)
		);
	}
}

export { SetDestinationGrid };