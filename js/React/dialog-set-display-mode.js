"use strict";

import { TypeChecker } from "../type-checker.js";
import { Dialog } from "./dialog.js";
import { RadioGroupContainer, RadioItem } from "./radio-group.js";

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
		const auto = this.state.autoDisplayMode;
		const left = this.state.leftDisplay;
		const right = this.state.rightDisplay;

		// the onDone function should perform state update in the parent component
		this.props.onDone(auto, left, right);
	}

	close() {
		this.props.onClose();
	}

	setAutoDisplayMode(mode) {
		mode = !!mode;
		this.setState({
			autoDisplayMode: mode,
			leftDisplay: !!this.state.leftDisplay || mode,
			rightDisplay: !!this.state.rightDisplay || mode
		});
	}

	setSideDisplay(side, display) {
		const sides = {
			"left": Symbol(),
			"right": Symbol()
		};

		if (!sides.hasOwnProperty(side)) {
			throw new Error(`Invalid side: ${side}; valid sides are ${Array.from(Object.keys(sides))}.`);
		} else {
			display = !!display;
			this.setState({
				autoDisplayMode: this.state.autoDisplayMode && display
			});

			switch (side) {
				case "left":
					this.setState({
						leftDisplay: display
					});
					break;
				case "right":
					this.setState({
						rightDisplay: display
					});
					break;
				default:
					break;
			}
		}
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
					RadioGroupContainer,
					null,
					React.createElement(RadioItem, {
						name: "autoDisplayMode",
						checked: this.state.autoDisplayMode,
						onChange: () => {
							this.setAutoDisplayMode(true);
						},
						text: "\u81EA\u52A8"
					}),
					React.createElement(RadioItem, {
						name: "autoDisplayMode",
						checked: !this.state.autoDisplayMode,
						onChange: () => {
							this.setAutoDisplayMode(false);
						},
						text: "\u624B\u52A8"
					})
				),
				React.createElement(
					"div",
					null,
					"\u5DE6\u4FA7\uFF1A"
				),
				React.createElement(
					RadioGroupContainer,
					null,
					React.createElement(RadioItem, {
						name: "leftDisplay",
						checked: this.state.leftDisplay,
						disabled: this.state.autoDisplayMode,
						onChange: () => {
							this.setSideDisplay("left", true);
						},
						text: "\u5F00"
					}),
					React.createElement(RadioItem, {
						name: "leftDisplay",
						checked: !this.state.leftDisplay,
						disabled: this.state.autoDisplayMode,
						onChange: () => {
							this.setSideDisplay("left", false);
						},
						text: "\u5173"
					})
				),
				React.createElement(
					"div",
					null,
					"\u53F3\u4FA7\uFF1A"
				),
				React.createElement(
					RadioGroupContainer,
					null,
					React.createElement(RadioItem, {
						name: "rightDisplay",
						checked: this.state.rightDisplay,
						disabled: this.state.autoDisplayMode,
						onChange: () => {
							this.setSideDisplay("right", true);
						},
						text: "\u5F00"
					}),
					React.createElement(RadioItem, {
						name: "rightDisplay",
						checked: !this.state.rightDisplay,
						disabled: this.state.autoDisplayMode,
						onChange: () => {
							this.setSideDisplay("right", false);
						},
						text: "\u5173"
					})
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