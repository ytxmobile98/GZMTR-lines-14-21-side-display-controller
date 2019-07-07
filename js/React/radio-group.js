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
		this.buttonRef = React.createRef();
	}

	render() {
		const onClickButton = () => {
			const radio = this.radioRef.current;
			radio.click();
		};

		return React.createElement(
			"label",
			{ className: "radio-button-group__item" },
			React.createElement("input", { ref: this.radioRef, type: "radio",
				name: this.props.name,
				value: String(this.props.value),
				className: "radio-button-group__radio",

				disabled: this.props.disabled,

				defaultChecked: this.props.defaultChecked,
				checked: this.props.checked,
				onClick: this.props.onClick || this.props.onChange,
				onChange: this.props.onChange || this.props.onClick,

				tabIndex: "-1"
			}),
			React.createElement(
				"button",
				{ ref: this.buttonRef,
					className: "radio-button-group__text-button",

					disabled: this.props.disabled,
					onClick: onClickButton,

					"data-js-has-border": !!this.props.hasBorder ? true : null,
					"data-js-extra-line-height": !!this.props.extraLineHeight ? true : null
				},
				this.props.text
			)
		);
	}
}

export { RadioGroup, RadioItem };