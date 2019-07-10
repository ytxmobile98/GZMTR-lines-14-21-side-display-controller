"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/PROCESSED-LINES-DATA.js";

import { StatusCell, StatusGridContainer, StatusContainer } from "./status-grid.js";
import { LED } from "./LED.js";
import { RadioGroup, RadioItem } from "./radio-group.js";


class ServiceTypeSelector extends React.Component {

	constructor(props) {
		super(props);
		this.previewLEDRef = React.createRef();
	}

	updatePreviewLED(serviceType, destination) {
		TypeChecker.checkInstanceOf(serviceType, ServiceType);
		TypeChecker.checkInstanceOf(destination, Station);
	}

	render() {

		const serviceTypes = this.props.serviceTypes;
		TypeChecker.checkArrayType(serviceTypes, ServiceType);

		const hasBorder = true;

		const handleUpdateServiceType = (e) => {
			this.props.updateServiceType(e.target.value);
		}

		const serviceTypeItems = serviceTypes.map((serviceType) => {
			return (
				<RadioItem
					name="serviceType"
					value={serviceType.Chinese}
					hasBorder={hasBorder}
					checked={this.props.serviceType === serviceType}
					onClick={handleUpdateServiceType}
					text={serviceType.Chinese}
					key={serviceType.Chinese}
					ref={React.createRef()}
				/>
			);
		});

		const line = this.props.line;
		const destination = this.props.destination;
		const serviceType = this.props.serviceType;

		return (
			<React.Fragment>

				<div className="LED-preview">
					<div className="warning-notes">
						预览（请点击“完成”以保存）
					</div>
					<LED
						serviceType={serviceType}
						destination={destination}
					/>
				</div>

				<StatusContainer>
					<StatusGridContainer sectionHeader="已选内容">
						<StatusCell
							itemHeader="线路"
							itemText={line}
							dataTag="status-line"
							dataValue={line}
						/>
						<StatusCell
							itemHeader="目的地"
							itemText={destination.Chinese}
						/>
						<StatusCell
							itemHeader="车种"
							itemText={serviceType.Chinese}
							dataTag="status-service-type"
							dataValue={serviceType.Chinese}
						/>
					</StatusGridContainer>
				</StatusContainer>

				<div className="service-type-selector">
					<RadioGroup header="选择车种">
						{serviceTypeItems}
					</RadioGroup>
				</div>

			</React.Fragment>
		);
	}

}

export { ServiceTypeSelector };
