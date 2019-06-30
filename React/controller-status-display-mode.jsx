"use strict";

class DisplayModeStatusColumn extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<div className="display-mode__header">{this.props.header}</div>
				<div className="display-mode__status">{this.props.status}</div>
			</React.Fragment>
		);
	}
}

class DisplayModeStatus extends React.PureComponent {
	render() {
		return (
			<div className="display-mode__container">
				{this.props.children}
			</div>
		);
	}
}

export { DisplayModeStatusColumn, DisplayModeStatus };
