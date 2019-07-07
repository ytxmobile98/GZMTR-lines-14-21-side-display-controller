"use strict";

import { Dialog } from "./dialog.js";
import { RadioGroup, RadioItem } from "./radio-group.js";

class SetDisplayModeDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			autoDisplayMode: this.props.autoDisplayMode,
			leftDisplay: this.props.leftDisplay,
			rightDisplay: this.props.rightDisplay,
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
			rightDisplay: !!this.state.rightDisplay || mode,
		});
	}

	setSideDisplay(side, display) {
		const sides = ["left", "right"];

		if (!sides.includes(side)) {
			throw new Error(`Invalid side: ${side}; valid sides are ${sides}.`);
		}

		else {
			display = !!display;
			const newState = {
				autoDisplayMode: !!this.state.autoDisplayMode && display,
			};
			newState[`${side}Display`] = display;
			this.setState(newState);
		}
	}

	render() {

		const boolVals = [true, false];
		const xor = (a, b) => {
			return !!a !== !!b;
		}
		const xnor = (a, b) => {
			return !(xor(a, b));
		}
		const getRadioValue = (bool) => {
			return (!!bool ? "true" : "");
		}

		const hasBorder = true;

		const displayModeItems = boolVals.map((bool) => {
			const text = bool ? "自动" : "手动";
			const setAutoDisplayMode = (e) => {
				this.setAutoDisplayMode(!!e.target.value);
			}

			return (
				<RadioItem
					name="autoDisplayMode"
					value={getRadioValue(bool)}
					hasBorder={hasBorder}
					checked={xnor(bool, this.state.autoDisplayMode)}
					onClick={setAutoDisplayMode}
					text={text}
					key={text}
				/>
			);
		});

		const sides = ["left", "right"];
		const [leftDisplay, rightDisplay] = sides.map((side) => {

			const radioItems = boolVals.map((bool) => {
				const name = `${side}Display`;
				const text = bool ? "开" : "关";
				const setSideDisplay = (e) => {
					this.setSideDisplay(side, !!e.target.value);
				}

				return (
					<RadioItem
						name={name}
						value={getRadioValue(bool)}
						hasBorder={hasBorder}
						checked={xnor(bool, this.state[name])}
						disabled={this.state.autoDisplayMode}
						onClick={setSideDisplay}
						text={text}
						key={text}
					/>
				);
			});
			return radioItems;

		});

		return (
			<Dialog
				title="开启/关闭方向幕"
				onDone={this.updateDisplayMode.bind(this)}
				onClose={this.close.bind(this)}
			>

				<div className="set-display-mode__container">
					<RadioGroup header="显示模式">
						{displayModeItems}
					</RadioGroup>

					<RadioGroup header="左侧">
						{leftDisplay}
					</RadioGroup>

					<RadioGroup header="右侧">
						{rightDisplay}
					</RadioGroup>
				</div>

				<div className="notes set-display-mode__notes">
					<p>
						自动模式下，方向幕开启条件：
					</p>
					<ol>
						<li>车速不高于30 km/h；</li>
						<li>进站时，面向站台一侧的方向幕将会开启。</li>
					</ol>
					<p className="warning-notes">
						注意：手动模式仅供在车厂测试设备时使用；运营时请始终使用自动模式。
					</p>
				</div>

			</Dialog>
		);
	}
}

export { SetDisplayModeDialog };
