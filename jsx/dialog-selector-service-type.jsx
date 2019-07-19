"use strict";

import { TypeChecker } from "../type-checker.js";

import { ServiceType, Station } from "../data/processed-lines-data-classes.js";

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

				<StatusContainer>
					<StatusGridContainer sectionHeader="选择车种">
						<StatusCell
							itemName="车种"
						>
							<div className="service-type-selector">
								<RadioGroup>
									{serviceTypeItems}
								</RadioGroup>
							</div>
						</StatusCell>
					</StatusGridContainer>

					<StatusGridContainer sectionHeader="预览（请点击“完成”以保存）">
						<div className="status__LED-preview">
							<LED
								serviceType={serviceType}
								destination={destination}
							/>
						</div>
						<StatusCell
							itemName="线路"
							itemData={line}
							dataTag="status-line"
							dataValue={line}
							sidePadding={true}
						/>
						<StatusCell
							itemName="目的地"
							itemData={destination.Chinese}
						/>
					</StatusGridContainer>
				</StatusContainer>

			</React.Fragment>
		);
	}

}

export { ServiceTypeSelector };
