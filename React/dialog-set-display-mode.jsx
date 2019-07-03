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
		const sides = {
			"left": Symbol(),
			"right": Symbol(),
		};

		if (!sides.hasOwnProperty(side)) {
			throw new Error(`Invalid side: ${side}; valid sides are ${Array.from(Object.keys(sides))}.`);
		}

		else {
			display = !!display;
			this.setState({
				autoDisplayMode: this.state.autoDisplayMode && display,
			});

			switch (side) {
				case "left":
					this.setState({
						leftDisplay: display,
					});
					break;
				case "right":
					this.setState({
						rightDisplay: display,
					});
					break;
				default:
					break;
			}
		}
	}

	render() {

		return (
			<Dialog
				title="开启/关闭方向幕"
				onDone={this.done.bind(this)}
				onClose={this.close.bind(this)}
			>

				<div className="set-display-mode__container">
					<RadioGroup header="显示模式">
						<RadioItem
							name="autoDisplayMode"
							checked={this.state.autoDisplayMode}
							onChange={()=>{
								this.setAutoDisplayMode(true);
							}}
							text="自动"
						/>
						<RadioItem
							name="autoDisplayMode"
							checked={!this.state.autoDisplayMode}
							onChange={()=>{
								this.setAutoDisplayMode(false);
							}}
							text="手动"
						/>
					</RadioGroup>

					<RadioGroup header="左侧">
						<RadioItem
							name="leftDisplay"
							checked={this.state.leftDisplay}
							disabled={this.state.autoDisplayMode}
							onChange={()=>{
								this.setSideDisplay("left", true);
							}}
							text="开"
						/>
						<RadioItem
							name="leftDisplay"
							checked={!this.state.leftDisplay}
							disabled={this.state.autoDisplayMode}
							onChange={()=>{
								this.setSideDisplay("left", false);
							}}
							text="关"
						/>
					</RadioGroup>

					<RadioGroup header="右侧">
						<RadioItem
							name="rightDisplay"
							checked={this.state.rightDisplay}
							disabled={this.state.autoDisplayMode}
							onChange={()=>{
								this.setSideDisplay("right", true);
							}}
							text="开"
						/>
						<RadioItem
							name="rightDisplay"
							checked={!this.state.rightDisplay}
							disabled={this.state.autoDisplayMode}
							onChange={()=>{
								this.setSideDisplay("right", false);
							}}
							text="关"
						/>
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
