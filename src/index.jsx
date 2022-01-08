const styles = require("./index.scss");

const React = require("react");
const ReactDOM = require("react-dom");
const moment = require("moment");

const variants = ["01:00", "02:00", "03:00", "04:00", "05:00", "07:00", "10:00", "15:00", "20:00", "25:00", "30:00", "45:00"];

function getCurrentDate() {
    return moment().locale("ru").format("DD.MM.YYYY, dddd");
}

function getCurrentTime() {
    return moment().format("HH:mm:ss");
}

class Timer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.setTime = this.setTime.bind(this);
        this.toggleStart = this.toggleStart.bind(this);

        this.state = {
            isStarted: false,
            remainingTimeClass: "normal",
            remainingTimeSource: [0, 5],
            currentDate: getCurrentDate(),
            currentTime: getCurrentTime()
        }
    }

    componentDidMount() {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 32) {
                this.toggleStart();
            }
        });

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        //window.removeEventListener("keyup");
        //window.removeEventListener("click");
        clearInterval(this.timerID);
    }

    tick() {
        let state = this.state;
        state.currentDate = getCurrentDate();
        state.currentTime = getCurrentTime();

        if (state.isStarted) {
            if (state.remainingTimeSource[0] > 0) {
                state.remainingTimeSource[0] = state.remainingTimeSource[0] - 1;
            } else {
                if (state.remainingTimeSource[1] > 0) {
                    state.remainingTimeSource[1] = state.remainingTimeSource[1] - 1;
                    state.remainingTimeSource[0] = 59;
                } else {
                    state.isStarted = false;
                    state.remainingTimeClass = "alert";
                    //state.audio.start();
                }
            }
        }

        this.setState(state);
    }

    toggleStart() {
        let state = this.state;

        if (state.remainingTimeSource.reduce((a, c) => a + c) === 0) {
            state.remainingTimeClass = "normal";
            //state.audio.stop();
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
        const variantComponents = variants.map((v) =>
            <div key={v} style={{display: "inline", margin: "0 auto", width: "100%"}}>
                <a href={"#"} onClick={this.setTime}>{v}</a>&nbsp;
            </div>
        )
        return (
            <div>
                <div className={"variants"}>
                    {variantComponents}
                </div>
                <div className={this.state.remainingTimeClass} onClick={this.toggleStart}>
                    {this.state.remainingTimeSource[1].toString().padStart(2, "0")}:{this.state.remainingTimeSource[0].toString().padStart(2, "0")}
                </div>
                <div className={"currentTime"}>
                    {this.state.currentTime}
                </div>
                <div className={"currentDate"}>
                    {this.state.currentDate}
                </div>
            </div>
        );
    }
}


ReactDOM.render(<Timer/>, document.getElementById("app"));
