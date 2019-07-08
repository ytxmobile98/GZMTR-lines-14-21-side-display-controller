"use strict";

import { LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { RadioItem, checkFirstItem } from "./radio-group.js";

class FilterSelector extends React.PureComponent {

	constructor(props) {
		super(props);
		this.filterItems = [];
	}

	checkFirstItem() {
		checkFirstItem(this.filterItems);
	}

	componentDidMount() {
		if (!this.props.filterName) {
			this.checkFirstItem();
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.line !== this.props.line) {
			this.checkFirstItem();
		}
	}

	render() {
		const line = this.props.line;
		const filters = LINES_INFO.get(line).filters;
		const filterNames = Array.from(filters.keys());

		const updateFilterName = this.props.updateFilterName;
		const handleUpdateFilterName = e => {
			updateFilterName(e.target.value);
		};

		const filterItems = filterNames.map(filterName => {
			return React.createElement(RadioItem, {
				name: "filter",
				value: filterName,
				checked: this.props.filterName === filterName,
				onClick: handleUpdateFilterName,
				extraLineHeight: true,
				text: filterName,
				key: `${line}-${filterName}`,
				ref: React.createRef()
			});
		});
		this.filterItems = filterItems;

		return React.createElement(
			React.Fragment,
			null,
			filterItems
		);
	}
}

export { FilterSelector };