"use strict";

import { LineInfoWrapper } from "../data/line-info-wrapper.js";

import { RadioItem } from "./radio-group.js";

class LineSelector extends React.PureComponent {

	render() {
		const lines = LineInfoWrapper.getLines();
		const updateLine = this.props.updateLine;
		const handleUpdateLine = (e) => {
			updateLine(e.target.value);
		};

		const lineItems = lines.map((line) => {
			return (
				<RadioItem
					name="line"
					value={line}
					checked={this.props.line === line}
					onClick={handleUpdateLine}
					extraLineHeight={true}
					text={line}
					key={line}
				/>
			);
		});

		return (
			<React.Fragment>
				{lineItems}
			</React.Fragment>
		);
	}

}

export { LineSelector };
