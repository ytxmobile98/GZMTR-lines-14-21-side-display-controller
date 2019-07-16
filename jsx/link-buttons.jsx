"use strict";

class LinkButton extends React.PureComponent {
	render() {
		return (
			<button className="link-icon" data-js-site={this.props.site}
				onClick={() => {
					window.open(this.props.url);
				}}
				title={this.props.title || this.props.site}
			/>
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
