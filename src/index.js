require("./index.scss");
require("bootstrap");

const React = require("react");
const ReactDOM = require("react-dom");

const moment = require("moment");

const Timer = require("./timer");
const variants = [1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 45];

ReactDOM.render(
	<Timer audio={new Audio("beep.wav")} window={window} moment={moment} variants={variants} calendarURL={"../prod-cal"}/>,
	document.getElementById("app")
);
