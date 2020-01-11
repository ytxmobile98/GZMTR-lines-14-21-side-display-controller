"use strict";

import { LinkButton, LinkButtonsContainer } from "./link-buttons.js";

class UsefulLinks extends React.PureComponent {
  render() {
    return React.createElement(LinkButtonsContainer, null, React.createElement(LinkButton, {
      url: "https://github.com/ytx21cn/GZMTR-lines-14-21-side-display-controller",
      image: "icons/GitHub.svg",
      title: "\u5728GitHub\u4E0A\u67E5\u770B\u6E90\u4EE3\u7801"
    }), React.createElement(LinkButton, {
      url: "https://developer.mozilla.org",
      image: "icons/MDN.svg",
      title: "MDN Web\u6587\u6863"
    }), React.createElement(LinkButton, {
      url: "https://reactjs.org/",
      image: "icons/React.svg",
      title: "React"
    }), React.createElement(LinkButton, {
      url: "https://material.io/tools/color/",
      image: "icons/material-color-tools-logo.svg",
      title: "Google Material Color Tools"
    }), React.createElement(LinkButton, {
      url: "http://www.gzmtr.com",
      image: "icons/GZMTR.svg",
      title: "\u5E7F\u5DDE\u5730\u94C1"
    }));
  }

}

export { UsefulLinks };