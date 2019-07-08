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
			serviceType: props.serviceType || SERVICE_TYPES["不载客"],
		};

		this.lineSelRef = React.createRef();
		this.filterSelRef = React.createRef();
		this.destSelRef = React.createRef();
	}

	updateLine(line) {
		this.setState({
			line: String(line || ""),
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
			filterName: String(filterName || ""),
		});

		if (!initialLineInfo.isPassengerService
			|| (initialLineInfo === currentLineInfo)) {
			this.setState({
				serviceType: filter.serviceType,
			});
		}
		else {
			this.setState({
				serviceType: filter.crossLineServiceType,
			});
		}
	}

	updateDestination(destination) {
		TypeChecker.checkInstanceOf(destination, Station);
		this.setState({
			destination: destination,
		});
	}

	saveSelections() {
		this.props.saveSelections(
			this.state.line,
			this.state.filterName,
			this.state.destination,
			this.state.serviceType,
		);
	}

	saveScrollTops() {
		this.props.saveScrollTops(
			this.lineSelRef.current.scrollTop,
			this.filterSelRef.current.scrollTop,
			this.destSelRef.current.scrollTop,
		);
	}

	componentDidMount() {
		this.lineSelRef.current.scrollTop = this.props.lineSelScrTop;
		this.filterSelRef.current.scrollTop = this.props.filterSelScrTop
		this.destSelRef.current.scrollTop = this.props.destSelScrTop;
	}

	componentWillUnmount() {
		this.saveSelections();
		this.saveScrollTops();
	}


	render() {

		const extraLineHeight = true;

		return (
			<div className="set-destination-grid__container">

				<div className="set-destination-grid__item set-destination-grid__item--header">线路</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container"
					ref={this.lineSelRef}
				>
					<LineSelector
						line={this.state.line}
						updateLine={this.updateLine.bind(this)}
					/>
				</div>

				<div className="set-destination-grid__item set-destination-grid__item--header">筛选列表</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container"
					ref={this.filterSelRef}
				>
					<FilterSelector
						line={this.state.line}
						filterName={this.state.filterName}
						updateFilterName={this.updateFilterName.bind(this)}
					/>
				</div>

				<div className="set-destination-grid__item set-destination-grid__item--header">目的地</div>
				<div className="set-destination-grid__item set-destination-grid__item--options-container set-destination-grid__item--destinations"
					ref={this.destSelRef}
				>
					<DestSelector
						line={this.state.line}
						filterName={this.state.filterName}
						destination={this.state.destination}
						updateDestination={this.updateDestination.bind(this)}
					/>
				</div>

			</div>
		);
	}
}

export { SetDestinationGrid };
