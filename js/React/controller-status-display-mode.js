"use strict";

class DisplayModeStatusColumn extends React.PureComponent {
	render() {
		return React.createElement(
			React.Fragment,
			null,
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

export { DisplayModeStatusColumn, DisplayModeStatus };