"use strict";

import { TypeChecker } from "../type-checker.js";
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
			rightDisplay: !!this.state.rightDisplay || mode,
		});
	}

	setSideDisplay(side, display) {
		const that = this;
		const sides = ["left", "right"];

		if (!sides.includes(side)) {
			throw new Error(`Invalid side: ${side}; valid sides are ${sides}.`);
		}

		else {
			display = !!display;
			const newState = {
				autoDisplayMode: !!that.state.autoDisplayMode && display,
			};
			newState[`${side}Display`] = display;
			that.setState(newState);
		}
	}

	render() {

		const that = this;

		const boolVals = [true, false];
		const xor = (a, b) => {
			return !!a !== !!b;
		}
		const xnor = (a, b) => {
			return !(xor(a, b));
		}

		const displayModeItems = boolVals.map((i) => {
			const text = i ? "自动" : "手动";
			return (
				<RadioItem
					name="autoDisplayMode"
					checked={xnor(i, that.state.autoDisplayMode)}
					onChange={()=>{
						that.setAutoDisplayMode(i);
					}}
					text={text}
					key={text}
				/>
			);
		});

		const sides = ["left", "right"];
		const [leftDisplay, rightDisplay] = sides.map((side) => {

			const radioItems = boolVals.map((i) => {
				const name = `${side}Display`;
				const text = i ? "开" : "关";

				return (
					<RadioItem
						name={name}
						checked={xnor(i, that.state[name])}
						disabled={that.state.autoDisplayMode}
						onChange={()=>{
							that.setSideDisplay(side, i);
						}}
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
				onDone={this.done.bind(this)}
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
