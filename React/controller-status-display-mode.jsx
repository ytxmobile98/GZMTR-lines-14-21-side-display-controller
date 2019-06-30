"use strict";

class DisplayModeStatusCell extends React.PureComponent {
	render() {
		return (
			<div className="display-mode__cell">
				<div className="display-mode__header">{this.props.header}</div>
				<div className="display-mode__status">{this.props.status}</div>
			</div>
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

export { DisplayModeStatusCell, DisplayModeStatus };
