"use strict";

import { LinkButton, LinkButtonsContainer } from "./link-buttons.js";

class UsefulLinks extends React.PureComponent {
	render() {
		return (
			<LinkButtonsContainer>
				<LinkButton
					url="https://github.com/ytx21cn/GZMTR-lines-14-21-side-display-controller"
					image="icons/GitHub.svg"
					title="在GitHub上查看源代码"
				/>
				<LinkButton
					url="https://developer.mozilla.org"
					image="icons/MDN.svg"
					title="MDN Web文档"
				/>
				<LinkButton
					url="https://reactjs.org/"
					image="icons/React.svg"
					title="React"
				/>
				<LinkButton
					url="https://material.io/tools/color/"
					image="icons/material-color-tools-logo.svg"
					title="Google Material Color Tools"
				/>
				<LinkButton
					url="http://www.gzmtr.com"
					image="icons/GZMTR.svg"
					title="广州地铁"
				/>
			</LinkButtonsContainer>
		);
	}
}

export { UsefulLinks };
