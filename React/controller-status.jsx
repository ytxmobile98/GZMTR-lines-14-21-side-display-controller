"use strict";

class StatusCell extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<div className="status__item-header">{this.props.itemHeader}</div>
				<div className="status__item-text">{this.props.itemText}</div>
			</React.Fragment>
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__grid-container">
				<div className="status__section-header">{this.props.sectionHeader}</div>
				{this.props.children}
			</div>
		);
	}
}

export { StatusCell, StatusGridContainer };
