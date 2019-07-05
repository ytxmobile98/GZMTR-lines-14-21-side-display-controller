"use strict";

import { Dialog } from "./dialog.js";
import { RadioGroup, RadioItem } from "./radio-group.js";

class SetDisplayModeDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			autoDisplayMode: this.props.autoDisplayMode,
			leftDisplay: this.props.leftDisplay,
			rightDisplay: this.props.rightDisplay
		};
	}

	updateDisplayMode() {
		const auto = this.state.autoDisplayMode;
		const left = this.state.leftDisplay;
		const right = this.state.rightDisplay;

		// the updateDisplayMode function should perform state update in the parent component
		this.props.updateDisplayMode(auto, left, right);
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
		const sides = ["left", "right"];

		if (!sides.includes(side)) {
			throw new Error(`Invalid side: ${side}; valid sides are ${sides}.`);
		} else {
			display = !!display;
			const newState = {
				autoDisplayMode: !!this.state.autoDisplayMode && display
			};
			newState[`${side}Display`] = display;
			this.setState(newState);
		}
	}

	render() {

		const boolVals = [true, false];
		const xor = (a, b) => {
			return !!a !== !!b;
		};
		const xnor = (a, b) => {
			return !xor(a, b);
		};
		const getRadioValue = bool => {
			return !!bool ? "true" : "";
		};

		const hasBorder = true;

		const displayModeItems = boolVals.map(bool => {
			const text = bool ? "自动" : "手动";
			const handleChange = e => {
				this.setAutoDisplayMode(!!e.target.value);
			};

			return React.createElement(RadioItem, {
				name: "autoDisplayMode",
				value: getRadioValue(bool),
				hasBorder: hasBorder,
				checked: xnor(bool, this.state.autoDisplayMode),
				onChange: handleChange,
				text: text,
				key: text
			});
		});

		const sides = ["left", "right"];
		const [leftDisplay, rightDisplay] = sides.map(side => {

			const radioItems = boolVals.map(bool => {
				const name = `${side}Display`;
				const text = bool ? "开" : "关";
				const handleChange = e => {
					this.setSideDisplay(side, !!e.target.value);
				};

				return React.createElement(RadioItem, {
					name: name,
					value: getRadioValue(bool),
					hasBorder: hasBorder,
					checked: xnor(bool, this.state[name]),
					disabled: this.state.autoDisplayMode,
					onChange: handleChange,
					text: text,
					key: text
				});
			});
			return radioItems;
		});

		return React.createElement(
			Dialog,
			{
				title: "\u5F00\u542F/\u5173\u95ED\u65B9\u5411\u5E55",
				onDone: this.updateDisplayMode.bind(this),
				onClose: this.close.bind(this)
			},
			React.createElement(
				"div",
				{ className: "set-display-mode__container" },
				React.createElement(
					RadioGroup,
					{ header: "\u663E\u793A\u6A21\u5F0F" },
					displayModeItems
				),
				React.createElement(
					RadioGroup,
					{ header: "\u5DE6\u4FA7" },
					leftDisplay
				),
				React.createElement(
					RadioGroup,
					{ header: "\u53F3\u4FA7" },
					rightDisplay
				)
			),
			React.createElement(
				"div",
				{ className: "notes set-display-mode__notes" },
				React.createElement(
					"p",
					null,
					"\u81EA\u52A8\u6A21\u5F0F\u4E0B\uFF0C\u65B9\u5411\u5E55\u5F00\u542F\u6761\u4EF6\uFF1A"
				),
				React.createElement(
					"ol",
					null,
					React.createElement(
						"li",
						null,
						"\u8F66\u901F\u4E0D\u9AD8\u4E8E30 km/h\uFF1B"
					),
					React.createElement(
						"li",
						null,
						"\u8FDB\u7AD9\u65F6\uFF0C\u9762\u5411\u7AD9\u53F0\u4E00\u4FA7\u7684\u65B9\u5411\u5E55\u5C06\u4F1A\u5F00\u542F\u3002"
					)
				),
				React.createElement(
					"p",
					{ className: "warning-notes" },
					"\u6CE8\u610F\uFF1A\u624B\u52A8\u6A21\u5F0F\u4EC5\u4F9B\u5728\u8F66\u5382\u6D4B\u8BD5\u8BBE\u5907\u65F6\u4F7F\u7528\uFF1B\u8FD0\u8425\u65F6\u8BF7\u59CB\u7EC8\u4F7F\u7528\u81EA\u52A8\u6A21\u5F0F\u3002"
				)
			)
		);
	}
}

export { SetDisplayModeDialog };