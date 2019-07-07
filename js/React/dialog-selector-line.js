"use strict";

import { LINES_INFO } from "../data/PROCESSED-LINES-DATA.js";
import { RadioItem } from "./radio-group.js";

class LineSelector extends React.Component {

	render() {
		const lines = Array.from(LINES_INFO.keys());
		const updateLine = this.props.updateLine;
		const handleSelect = e => {
			updateLine(e.target.value);
		};

		const lineItems = lines.map(line => {
			return React.createElement(RadioItem, {
				name: "line",
				value: line,
				checked: this.props.line === line,
				onChange: handleSelect,
				extraLineHeight: true,
				text: line,
				key: line
			});
		});

		return React.createElement(
			React.Fragment,
			null,
			lineItems
		);
	}

}

export { LineSelector };