"use strict";

import { TypeChecker } from "../type-checker.js";

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
		if (prevProps.filters !== this.props.filters) {
			this.checkFirstItem();
		}
	}

	render() {
		const filters = this.props.filters;
		TypeChecker.checkInstanceOf(filters, Map);
		const filterNames = Array.from(filters.keys());

		const updateFilterName = this.props.updateFilterName;
		const handleUpdateFilterName = (e) => {
			updateFilterName(e.target.value);
		};

		const filterItems = filterNames.map((filterName) => {
			return (
				<RadioItem
					name="filter"
					value={filterName}
					checked={this.props.filterName === filterName}
					onClick={handleUpdateFilterName}
					extraLineHeight={true}
					text={filterName}
					key={`${this.props.line}-${filterName}`}
					ref={React.createRef()}
				/>
			);
		});
		this.filterItems = filterItems;

		return (
			<React.Fragment>
				{filterItems}
			</React.Fragment>
		);
	}
}

export {FilterSelector}
