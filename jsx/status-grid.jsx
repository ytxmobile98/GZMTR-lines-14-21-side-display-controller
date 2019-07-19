"use strict";

class StatusCell extends React.PureComponent {
	constructor(props) {
		super(props);
		this.itemDataRef = React.createRef();
	}

	updateDataTag() {
		const dataTag = this.props.dataTag ?
			`data-js-${this.props.dataTag}` : undefined;
		const dataValue = this.props.dataValue;

		const itemDataElement = this.itemDataRef.current;
		itemDataElement.removeAttribute(this.dataTag);

		if (!!dataTag) {
			this.dataTag = dataTag;
			this.dataValue = dataValue;
			itemDataElement.setAttribute(dataTag, dataValue);
		}
	}

	componentDidMount() {
		this.updateDataTag();
	}

	componentDidUpdate() {
		this.updateDataTag();
	}

	render() {
		return (
			<React.Fragment>
				<div className="status__item-name">
					{this.props.itemName}
				</div>
				<div className="status__item-data-container">
					<span className="status__item-data"
						ref={this.itemDataRef}
						data-js-side-padding={this.props.sidePadding ? true : null}
					>
						{this.props.itemData || this.props.children}
					</span>
				</div>
			</React.Fragment>
		);
	}
}

class StatusGridContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__grid-container">
				<div className="status__section-header">
					{this.props.sectionHeader}
				</div>
				{this.props.children}
			</div>
		);
	}
}

class StatusContainer extends React.PureComponent {
	render() {
		return (
			<div className="status__container"
				data-js-multi-cols={this.props.multiCols ? true : null}
			>
				{this.props.children}
			</div>
		);
	}
}

export { StatusCell, StatusGridContainer, StatusContainer };
