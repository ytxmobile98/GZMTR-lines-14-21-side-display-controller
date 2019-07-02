"use strict";

import { TypeChecker } from "../type-checker.js";
import { Dialog } from "./dialog.js";

class SetDestinationDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "选择目的地",
		}
	}

	done() {
		this.props.onDone();
	}

	close() {
		this.props.onClose();
	}

	render() {
		return (
			<Dialog
				title={this.state.title}
				onDone={this.done.bind(this)}
				onClose={this.close.bind(this)}
			>
				
			</Dialog>
		);
	}
}

export { SetDestinationDialog };
