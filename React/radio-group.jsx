"use strict";

import { TypeChecker } from "../type-checker.js";

class RadioGroup extends React.PureComponent {
	render() {
		return (
			<React.Fragment>
				<div className="radio-button-group__header">
					{this.props.header}
				</div>
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
	}

	render() {
		const that = this;

		const onClickButton = () => {
			const radio = that.radioRef.current;
			radio.click();
		};

		return (
			<label className="radio-button-group__item">
				<input ref={that.radioRef} type="radio"
					name={that.props.name}
					value={String(that.props.value)}
					className="radio-button-group__radio"

					disabled={that.props.disabled}

					defaultChecked={that.props.defaultChecked}
					checked={that.props.checked}
					onChange={that.props.onChange}

					tabIndex="-1"
				/>
				<button className="radio-button-group__text-button"
					disabled={that.props.disabled}
					onClick={onClickButton}
					data-js-has-border={!!that.props.hasBorder ? true : null}
					data-js-extra-line-height={!!that.props.extraLineHeight ? true : null}
				>
					{that.props.text}
				</button>
			</label>
		);
	}
}

export { RadioGroup, RadioItem };
