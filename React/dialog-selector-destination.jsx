"use strict";

import { TypeChecker } from "../type-checker.js";

import { Station, LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { Filter } from "../data/filter-classes.js";

import { RadioItem } from "./radio-group.js";

class DestSelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.destItems = [];
	}

	render() {
		const line = String(this.props.line || "");

		const filterName = String(this.props.filterName || "");
		const filter = LINES_INFO.get(line).filters.get(filterName);
		if (!filter) {
			return null;
		}
		TypeChecker.checkInstanceOf(filter, Filter);

		const destinations = filter.destinations;
		TypeChecker.checkArrayType(destinations, Station);

		const updateDestination = this.props.updateDestination;
		const extraLineHeight = true;

		const destItems = destinations.map((destination) => {
			return (
				<RadioItem
					name="destination"
					value={destination.Chinese}
					extraLineHeight={extraLineHeight}
					text={destination.Chinese}
					key={destination.Chinese}
				/>
			);
		});
		this.destItems = destItems;

		return (
			<React.Fragment>
				{destItems}
			</React.Fragment>
		);
	}
}

export { DestSelector };
