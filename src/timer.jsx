const React = require("react");
const moment = require("moment");

const Time = require("./time");

class Timer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.setTime = this.setTime.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
        this.time = new Time(moment);

        this.state = {
            isStarted: false,
            remainingTimeClass: "normal",
            remainingTimeSource: [5, 0],
            currentTime: this.time.getCurrentTime()
        }
    }

    componentDidMount() {
        window.addEventListener("keyup", (event) => {
            if (event.key === " ") {
                this.toggleStart();
                event.preventDefault();
            }
        });

        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let state = this.state;
        state.currentTime = this.time.getCurrentTime();

        if (state.isStarted) {
            if (state.remainingTimeSource[0] > 0) {
                state.remainingTimeSource[0] = state.remainingTimeSource[0] - 1;
            } else {
                if (state.remainingTimeSource[1] > 0) {
                    state.remainingTimeSource[1] = state.remainingTimeSource[1] - 1;
                    state.remainingTimeSource[0] = 59;
                } else {
                    state.remainingTimeClass = "alert";
                    state.isStarted = false;
                    this.props.audio.play();
                }
            }
        }

        this.setState(state);
    }

    toggleStart() {
        let state = this.state;

        if (state.remainingTimeSource.reduce((a, c) => a + c) === 0) {
            state.remainingTimeClass = "normal";
        } else {
            state.isStarted = !state.isStarted;
        }

        this.setState(state);
    }

    setTime(v) {
        this.setState({
            isStarted: true,
            remainingTimeClass: "normal",
            remainingTimeSource: v.target.outerText.split(":").map((i) => parseInt(i, 10)).reverse()
        });
    }

    render() {
        const variantComponents = this.props.variants.map((v) =>
            <div key={v} className={"variants col-sm"}>
                <a href={"#"} onClick={this.setTime}>{v}</a>
            </div>
        )
        return (
            <div className={"container"}>
                <div className={"row"}>
                    {variantComponents}
                </div>

                <div className={"row"}>
                    <div className={"col"}>
                        <div className={this.state.remainingTimeClass} onClick={this.toggleStart}>
                            {this.state.remainingTimeSource[1].toString().padStart(2, "0")}
                            <span style={this.state.isStarted ? {animation: "blinker 1s linear infinite"} : {}}>:</span>
                            {this.state.remainingTimeSource[0].toString().padStart(2, "0")}
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col currentTime"}>
                        {this.state.currentTime}
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col"} style={{textAlign : "right", color: "#666"}}>
                        Версия 2022 года. Ищете <a href={"./old"}>старую версию</a>?
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Timer;