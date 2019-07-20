"use strict";

import { TypeChecker } from "../type-checker.js";

import { Station } from "../data/station-classes.js";
import { Filter } from "../data/filter-classes.js";

import { RadioItem, checkFirstItem } from "./radio-group.js";

class DestSelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.destItems = [];
	}

	checkFirstItem() {
		checkFirstItem(this.destItems);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.filter !== this.props.filter) {
			this.checkFirstItem();
		}
	}

	render() {
		const filter = this.props.filter;
		if (!filter) {
			return null;
		}
		TypeChecker.checkInstanceOf(filter, Filter);

		const destinations = filter.destinations;
		TypeChecker.checkArrayType(destinations, Station);

		const handleUpdateDestination = e => {
			const stationNameChinese = e.target.value;
			this.props.updateDestination(stationNameChinese);
		};

		const destItems = destinations.map(destination => {
			return React.createElement(RadioItem, {
				name: "destination",
				value: destination.Chinese,
				checked: this.props.destination === destination,
				onClick: handleUpdateDestination,
				text: destination.Chinese,
				key: destination.Chinese,
				ref: React.createRef()
			});
		});
		this.destItems = destItems;

		return React.createElement(
			React.Fragment,
			null,
			destItems
		);
	}
}

export { DestSelector };