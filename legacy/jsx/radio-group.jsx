"use strict";

import { TypeChecker } from "../type-checker.js";

class RadioGroup extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				{this.props.header ?
					<div className="radio-button-group__header">
						{this.props.header}
					</div>
					: null
				}
				<div className="radio-button-group__container">
					{this.props.children}
				</div>
			</React.Fragment>
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

		return (
			<label className="radio-button-group__item">
				<input ref={this.radioRef} type="radio"
					name={this.props.name}
					value={String(this.props.value)}
					className="radio-button-group__radio"

					disabled={this.props.disabled}

					defaultChecked={this.props.defaultChecked}
					checked={this.props.checked}
					onClick={this.props.onClick || this.props.onChange}
					onChange={this.props.onChange || this.props.onClick}

					tabIndex="-1"
				/>
				<button ref={this.buttonRef}
					className="radio-button-group__text-button"

					disabled={this.props.disabled}
					onClick={onClickButton}

					data-js-has-border={!!this.props.hasBorder ? true : null}
				>
					{this.props.text}
				</button>
			</label>
		);
	}
}

const checkFirstItem = (list) => {
	TypeChecker.checkInstanceOf(list, Array);
	if (list.length > 0) {
		const firstItem = list[0].ref.current;
		if (firstItem) {
			const button = firstItem.buttonRef.current;
			button.click();
		}
	}
};

export { RadioGroup, RadioItem, checkFirstItem };
