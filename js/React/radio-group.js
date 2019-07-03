"use strict";

import { TypeChecker } from "../type-checker.js";

class RadioGroup extends React.PureComponent {
	render() {
		return React.createElement(
			React.Fragment,
			null,
			React.createElement(
				"div",
				{ className: "radio-button-group__header" },
				this.props.header
			),
			React.createElement(
				"div",
				{ className: "radio-button-group__container" },
				this.props.children
			)
		);
	}
}

class RadioItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.radioRef = React.createRef();
	}

	render() {
		const that = this;

		const onClickButton = () => {
			const radio = that.radioRef.current;
			radio.click();
		};

		return React.createElement(
			"label",
			{ className: "radio-button-group__item" },
			React.createElement("input", { ref: that.radioRef, type: "radio",
				name: that.props.name,
				className: "radio-button-group__radio",
				checked: that.props.checked,
				disabled: that.props.disabled,
				onChange: that.props.onChange,
				tabIndex: "-1"
			}),
			React.createElement(
				"button",
				{ className: "radio-button-group__text",
					disabled: that.props.disabled,
					onClick: onClickButton
				},
				that.props.text
			)
		);
	}
}

export { RadioGroup, RadioItem };