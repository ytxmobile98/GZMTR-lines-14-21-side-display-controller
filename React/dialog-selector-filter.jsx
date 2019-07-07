"use strict";

import { LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { RadioItem } from "./radio-group.js";

class FilterSelector extends React.Component {

	constructor(props) {
		super(props);
		this.filterItems = [];
	}

	checkFirstItem() {
		if (this.filterItems.length > 0) {
			const firstItem = this.filterItems[0].ref.current;
			const button = firstItem.buttonRef.current;
			button.click();
		}
	}

	componentDidMount() {
		this.checkFirstItem();
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
		const handleSelect = (e) => {
			updateFilterName(e.target.value);
		};

		const filterItems = filterNames.map((filterName) => {
			return (
				<RadioItem
					name="filter"
					value={filterName}
					onChange={handleSelect}
					extraLineHeight={true}
					text={filterName}
					key={`${line}-${filterName}`}
					ref={React.createRef()}
				/>
			);
		});
		this.filterItems = filterItems;

		return (
			<React.Fragment>
				{filterItems}
			</React.Fragment>
		)
	}
}

export {FilterSelector}
