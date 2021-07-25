"use strict";

class MasterButtonsContainer extends React.PureComponent {
	render() {
		return (
			<div className="master-buttons__container">
				{this.props.children}
			</div>
		);
	}
}

class MasterButton extends React.PureComponent {
	render() {
		return (
			<button
				className="master-button button--action"
				onClick={this.props.onClick}
			>
				{this.props.text}
			</button>
		);
	}
}

export { MasterButtonsContainer, MasterButton };
