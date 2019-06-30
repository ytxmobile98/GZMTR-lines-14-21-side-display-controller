"use strict";

class StatusCell extends React.PureComponent {
	render() {
		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"div",
				{ className: "status__header" },
				this.props.header
			),
			React.createElement(
				"div",
				{ className: "status__text" },
				this.props.status
			)
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return React.createElement(
			"div",
			{ className: "status__grid-container" },
			this.props.children
		);
	}
}

export { StatusCell, StatusGridContainer };