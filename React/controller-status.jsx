"use strict";

class StatusCell extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<div className="status__header">{this.props.header}</div>
				<div className="status__text">{this.props.status}</div>
			</React.Fragment>
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__grid-container">
				{this.props.children}
			</div>
		);
	}
}

export { StatusCell, StatusGridContainer };
