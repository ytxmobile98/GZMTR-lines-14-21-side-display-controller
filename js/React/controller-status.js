"use strict";

class StatusCell extends React.PureComponent {
	render() {
		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"div",
				{ className: "status__item-header" },
				this.props.itemHeader
			),
			React.createElement(
				"div",
				{ className: "status__item-text" },
				this.props.itemText
			)
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return React.createElement(
			"div",
			{ className: "status__grid-container" },
			React.createElement(
				"div",
				{ className: "status__section-header" },
				this.props.sectionHeader
			),
			this.props.children
		);
	}
}

export { StatusCell, StatusGridContainer };