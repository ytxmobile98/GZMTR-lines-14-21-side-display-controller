"use strict";

import { TypeChecker } from "../type-checker.js";
import { Dialog } from "./dialog.js";

class SetDisplayModeDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			autoDisplayMode: this.props.autoDisplayMode,
			leftDisplay: this.props.leftDisplay,
			rightDisplay: this.props.rightDisplay
		};
	}

	done() {
		this.props.onDone();
	}

	close() {
		this.props.onClose();
	}

	render() {

		return React.createElement(
			Dialog,
			{
				title: "\u5F00\u542F/\u5173\u95ED\u663E\u793A\u5C4F",
				onDone: this.done.bind(this),
				onClose: this.close.bind(this)
			},
			React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					"\u663E\u793A\u6A21\u5F0F\uFF1A"
				),
				React.createElement(
					"label",
					null,
					React.createElement("input", { id: "js-0", type: "radio", name: "autoDisplayMode", value: true,
						checked: this.state.autoDisplayMode,
						onChange: e => {
							this.setState({
								autoDisplayMode: e.target.checked
							});
							this.setState(prevState => {
								console.log(prevState);
							});
						},
						tabIndex: "-1",
						style: { display: "none" }
					}),
					React.createElement(
						"button",
						{
							onClick: () => {
								document.getElementById("js-0").click();
							}
						},
						"\u81EA\u52A8"
					)
				),
				React.createElement(
					"label",
					null,
					React.createElement("input", { type: "radio", name: "autoDisplayMode", value: false,
						checked: !this.state.autoDisplayMode,
						onChange: () => {},
						tabIndex: "-1"
					}),
					React.createElement(
						"button",
						{
							onClick: () => {
								this.setState({ autoDisplayMode: false });
							},
							tabIndex: "0"
						},
						"\u624B\u52A8"
					)
				),
				React.createElement(
					"div",
					null,
					"\u5DE6\u4FA7\uFF1A"
				),
				React.createElement(
					"div",
					null,
					"\u53F3\u4FA7\uFF1A"
				)
			),
			React.createElement(
				"div",
				{ className: "warning-notes" },
				"\u6CE8\u610F\uFF1A\u8FD0\u8425\u65F6\u8BF7\u59CB\u7EC8\u9009\u62E9\u81EA\u52A8\u6A21\u5F0F\u3002"
			)
		);
	}
}

export { SetDisplayModeDialog };