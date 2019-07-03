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
				title="开启/关闭显示屏"
				onDone={this.done.bind(this)}
				onClose={this.close.bind(this)}
			>

				<div>
					<div>显示模式：</div>
					<RadioGroupContainer>
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
					</RadioGroupContainer>

					<div>左侧：</div>
					<RadioGroupContainer>
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
					</RadioGroupContainer>

					<div>右侧：</div>
					<RadioGroupContainer>
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
					</RadioGroupContainer>

				</div>

				<div className="warning-notes">注意：运营时请始终选择自动模式。</div>

			</Dialog>
		);
	}
}

export { SetDisplayModeDialog };
