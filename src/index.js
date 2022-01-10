require("./index.scss");
require("bootstrap");

const React = require("react");
const ReactDOM = require("react-dom");

const moment = require("moment");
const Time = require("./time");

const Timer = require("./timer");
const variants = ["01:00", "02:00", "03:00", "04:00", "05:00", "07:00", "10:00", "15:00", "20:00", "25:00", "30:00", "45:00"];

ReactDOM.render(
	<Timer audio={new Audio("beep.wav")} window={window} time={new Time(moment)} variants={variants}/>,
	document.getElementById("app")
);
