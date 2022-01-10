const React = require("react");
const useState = require("react").useState;
const useEffect = require("react").useEffect;
const PropTypes = require("prop-types");

const Variant = require("./variant");
const VariantList = require("./variant-list");
const Display = require("./display");
const Time = require("./time");
const Version = require("./version");

const Timer = (props) => {

	const [state, setState] = useState(Display.STOPPED);
	const [remainingTimeSource, setRemainingTimeSource] = useState([0, 5]);
	const [currentTime, setCurrentTime] = useState(props.moment().locale("ru"));

	useEffect(() => {
		props.window.addEventListener("keyup", (event) => {
			if (event.key === " ") {
				toggleStart();
				event.preventDefault();
			}
		});

		const timerID = setInterval(() => tick(), 1000);

		return () => clearTimeout(timerID);
	});

	function tick() {
		setCurrentTime(props.moment().locale("ru"));

		if (state === Display.STARTED) {
			if (remainingTimeSource[0] > 0) {
				remainingTimeSource[0] = remainingTimeSource[0] - 1;
				setRemainingTimeSource(remainingTimeSource);
			} else {
				if (remainingTimeSource[1] > 0) {
					remainingTimeSource[1] = remainingTimeSource[1] - 1;
					remainingTimeSource[0] = 59;
					setRemainingTimeSource(remainingTimeSource);
				} else {
					setState(Display.ALERTED);
					props.audio.play();
				}
			}
		}

	}

	function toggleStart() {
		if (remainingTimeSource.reduce((a, c) => a + c) === 0) {
			setState(Display.STOPPED);
		} else {
			setState(state === Display.STOPPED ? Display.STARTED : Display.STOPPED);
		}
	}

	function setTime(value) {
		setState(Display.STARTED);
		setRemainingTimeSource(value.split(":").map((i) => parseInt(i, 10)).reverse());
	}


	return (
		<div className="container-fluid">
			<VariantList variant={Variant} onClick={setTime} variants={props.variants}/>
			<Display onClick={toggleStart} status={state} value={remainingTimeSource}/>
			<Time moment={currentTime}/>
			<Version year={"2022"} oldUrl={"./old/"}/>
		</div>
	);
};

Timer.propTypes = {
	audio: PropTypes.object.isRequired,
	window: PropTypes.object.isRequired,
	moment: PropTypes.func.isRequired,
	variants: PropTypes.array.isRequired
};

module.exports = Timer;