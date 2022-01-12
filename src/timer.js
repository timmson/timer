const React = require("react");
const PropTypes = require("prop-types");

const Variant = require("./variant");
const VariantList = require("./variant-list");
const Display = require("./display");
const Time = require("./time");
const Version = require("./version");

const Timer = (props) => {

	const moment = props.moment;
	const [window] = React.useState(props.window);
	const [state, setState] = React.useState(() => {
		return {
			status: Display.STOPPED,
			remainingSeconds: 300,
			currentTime: moment().valueOf()
		};
	}
	);

	React.useEffect(() => {
		const startStopHandler = (event) => {
			if (event.key === " ") {
				toggleStart();
				event.preventDefault();
			}
		};
		window.addEventListener("keyup", startStopHandler);
		return () => window.removeEventListener("keyup", startStopHandler);
	}, [window]);

	React.useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearTimeout(timerID);
	}, [state]);

	function tick() {
		setState((prevState) => {

			if (prevState.status === Display.STARTED) {
				if (prevState.remainingSeconds > 0) {
					prevState.remainingSeconds--;
				} else {
					prevState.status = Display.ALERTED;
					props.audio.play();
				}
			}

			return {
				status: prevState.status,
				remainingSeconds: prevState.remainingSeconds,
				currentTime: moment().valueOf()
			};
		});
	}

	function toggleStart() {
		setState((prevState) => {
			if (prevState.remainingSeconds === 0) {
				prevState.status = Display.STOPPED;
			} else {
				prevState.status = (prevState.status === Display.STOPPED ? Display.STARTED : Display.STOPPED);
			}
			return prevState;
		});

	}

	function setTime(value) {
		setState((prevState) => {
			prevState.status = Display.STARTED;

			const [seconds, minutes] = value.split(":").map((i) => parseInt(i, 10)).reverse();
			prevState.remainingSeconds = minutes * 60 + seconds;

			return prevState;
		});
	}


	return (
		<div className="container-fluid">
			<VariantList variant={Variant} variants={props.variants} onClick={setTime}/>
			<Display status={state.status} value={state.remainingSeconds} onClick={toggleStart}/>
			<Time moment={moment(state.currentTime).locale("ru")} calendarURL={props.calendarURL}/>
			<Version year={"2022"} oldUrl={"./old/"}/>
		</div>
	);
};

Timer.propTypes = {
	audio: PropTypes.object.isRequired,
	window: PropTypes.object.isRequired,
	moment: PropTypes.func.isRequired,
	variants: PropTypes.array.isRequired,
	calendarURL: PropTypes.string.isRequired
};

module.exports = Timer;