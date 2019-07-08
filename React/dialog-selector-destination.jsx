"use strict";

import { TypeChecker } from "../type-checker.js";

import { Station, DESTINATIONS, LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
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
		if ((prevProps.line !== this.props.line)
			|| (prevProps.filterName !== this.props.filterName)) {
			this.checkFirstItem();
		}
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

		const handleUpdateDestination = (e) => {
			const stationName = e.target.value
			const destination = DESTINATIONS[stationName];
			TypeChecker.checkInstanceOf(destination, Station);
			this.props.updateDestination(destination);
		}

		const extraLineHeight = true;

		const destItems = destinations.map((destination) => {
			return (
				<RadioItem
					name="destination"
					value={destination.Chinese}
					checked={this.props.destination === destination}
					onClick={handleUpdateDestination}
					extraLineHeight={extraLineHeight}
					text={destination.Chinese}
					key={destination.Chinese}
					ref={React.createRef()}
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
