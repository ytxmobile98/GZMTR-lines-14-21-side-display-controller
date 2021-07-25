"use strict";

class LinkButton extends React.PureComponent {
	render() {
		return (
			<a className="link-icon__button"
				href={this.props.url}
				target="_blank"
				title={this.props.title}
			>
				<img className="link-icon" src={this.props.image} />
			</a>
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
