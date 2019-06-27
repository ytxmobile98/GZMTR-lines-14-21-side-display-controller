"use strict";

class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		//this.props.onMount();
	}

	render() {
		return (
			<div className="modal">
				<div className="modal__background">
					<button className="modal__close-button">{this.props.closeModalText || "关闭遮罩"}</button>
				</div>
			</div>
		);
	}
}

export { Modal };
