"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";
import { LineInfoWrapper } from "../data/line-info-wrapper.js";

import { RadioGroup, RadioItem } from "./radio-group.js";
import { LineSelector } from "./dialog-selector-line.js";
import { FilterSelector } from "./dialog-selector-filter.js";
import { DestSelector } from "./dialog-selector-destination.js";

class SetDestinationGrid extends React.Component {
	constructor(props) {
		super(props);

		this.initialLine = props.initialLine;

		this.state = {
			line: String(props.line || ""),
			filterName: String(props.filterName || ""),
			destination: props.destination || LineInfoWrapper.getDefaultDest(),
			serviceType: props.serviceType || LineInfoWrapper.getDefaultServiceType()
		};

		TypeChecker.checkInstanceOf(this.state.destination, Station);
		TypeChecker.checkInstanceOf(this.state.serviceType, ServiceType);

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
		const currentLine = this.state.line;

		this.setState({
			filterName: String(filterName || "")
		});

		if (!LineInfoWrapper.checkPassengerService(initialLine) || initialLine === currentLine) {
			const serviceType = LineInfoWrapper.getFilterServiceType(currentLine, filterName);
			TypeChecker.checkInstanceOf(serviceType, ServiceType);
			this.setState({
				serviceType: serviceType
			});
		} else {
			const crossLineServiceType = LineInfoWrapper.getFilterCrossLineServiceType(currentLine, filterName);
			TypeChecker.checkInstanceOf(crossLineServiceType, ServiceType);
			this.setState({
				serviceType: crossLineServiceType
			});
		}
	}

	updateDestination(destNameChinese) {
		const destination = LineInfoWrapper.getDestination(destNameChinese);
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
		this.lineSelRef.current.scrollTop = this.props.lineSelScrTop;
		this.filterSelRef.current.scrollTop = this.props.filterSelScrTop;
		this.destSelRef.current.scrollTop = this.props.destSelScrTop;
	}

	componentWillUnmount() {
		this.saveSelections();
		this.saveScrollTops();
	}

	render() {

		const line = this.state.line;
		const filterName = this.state.filterName;
		const filters = LineInfoWrapper.getLineFilters(line);
		const filter = LineInfoWrapper.getFilter(line, filterName);
		const destination = this.state.destination;

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
					line: line,
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
					line: line,
					filterName: filterName,
					filters: filters,
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
					filter: filter,
					destination: destination,
					updateDestination: this.updateDestination.bind(this)
				})
			)
		);
	}
}

export { SetDestinationGrid };