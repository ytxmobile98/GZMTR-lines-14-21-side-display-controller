"use strict";

import { TypeChecker } from "../type-checker.js";
import { Dialog } from "./dialog.js";

class SetDisplayModeDialog extends React.Component {
	constructor(props) {
		super(props);

		this.settings = {
			autoDisplayMode: this.props.autoDisplayMode,
			leftDisplay: this.props.leftDisplay,
			rightDisplay: this.props.rightDisplay,
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
				title="开启/关闭显示屏"
				onDone={this.done.bind(this)}
				onClose={this.close.bind(this)}
			>
				<div>
					<div>显示模式：</div>
					<div>左侧：</div>
					<div>右侧：</div>
				</div>
				<div className="warning-notes">注意：运营时请始终选择自动模式。</div>
			</Dialog>
		);
	}
}

export { SetDisplayModeDialog };
