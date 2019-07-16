"use strict";

class LinkButton extends React.PureComponent {
	render() {
		return (
			<button className="link-icon__button"
				onClick={() => {
					window.open(this.props.url);
				}}
				title={this.props.title}
			>
				<img className="link-icon" src={this.props.image} />
			</button>
		);
	}
}

class LinkButtonsContainer extends React.PureComponent {
	render() {
		return (
			<div className="link-icons__container">
				{this.props.children}
			</div>
		);
	}
}

export { LinkButton, LinkButtonsContainer };
