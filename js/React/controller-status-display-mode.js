"use strict";

class DisplayModeStatusCell extends React.PureComponent {
	render() {
		return React.createElement(
			"div",
			{ className: "display-mode__cell" },
			React.createElement(
				"div",
				{ className: "display-mode__header" },
				this.props.header
			),
			React.createElement(
				"div",
				{ className: "display-mode__status" },
				this.props.status
			)
		);
	}
}

class DisplayModeStatus extends React.PureComponent {
	render() {
		return React.createElement(
			"div",
			{ className: "display-mode__container" },
			this.props.children
		);
	}
}

export { DisplayModeStatusCell, DisplayModeStatus };