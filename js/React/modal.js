"use strict";

class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//this.props.onMount();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "modal" },
			React.createElement(
				"div",
				{ className: "modal__background" },
				React.createElement(
					"button",
					{ className: "modal__close-button" },
					this.props.closeModalText || "关闭遮罩"
				)
			)
		);
	}
}

export { Modal };