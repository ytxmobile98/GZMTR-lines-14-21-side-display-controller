"use strict";

import { StatusContainer, StatusGridContainer, StatusCell } from "./status-grid.js";

class MonitorArea extends React.PureComponent {
	render() {
		return (
			<StatusContainer multiCols={true}>
				{this.props.children}
			</StatusContainer>
		);
	}
}

class DisplayModeGrid extends React.PureComponent {
	render() {
		return (
			<StatusGridContainer sectionHeader="方向幕显示状态">
				<StatusCell
					itemName="显示模式"
					itemData={this.props.autoDisplayMode ? "自动" : "手动"}
					dataTag="status-display-mode"
					dataValue={this.props.autoDisplayMode ? "自动" : "手动"}
				/>
				<StatusCell
					itemName="左侧"
					itemData={this.props.leftDisplay ? "开" : "关"}
					dataTag="status-display-switch"
					dataValue={this.props.leftDisplay ? "开" : "关"}
				/>
				<StatusCell
					itemName="右侧"
					itemData={this.props.rightDisplay ? "开" : "关"}
					dataTag="status-display-switch"
					dataValue={this.props.rightDisplay ? "开" : "关"}
				/>
			</StatusGridContainer>
		);
	}
}

class TrainInfoGrid extends React.PureComponent {
	render() {
		return (
			<StatusGridContainer sectionHeader="列车运营状态">
				<StatusCell
					itemName="线路"
					itemData={this.props.line}
					dataTag="status-line"
					dataValue={this.props.line}
					sidePadding={true}
				/>
				<StatusCell
					itemName="目的地"
					itemData={this.props.destination.Chinese}
					dataTag="status-destination"
					dataValue={this.props.destination.Chinese}
				/>
				<StatusCell
					itemName="车种"
					itemData={this.props.serviceType.Chinese}
					dataTag="status-service-type"
					dataValue={this.props.serviceType.Chinese}
					sidePadding={true}
				/>
			</StatusGridContainer>
		);
	}
}

export { MonitorArea, DisplayModeGrid, TrainInfoGrid };
