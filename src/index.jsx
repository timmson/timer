const styles = require("./index.scss");

const React = require("react");
const ReactDOM = require("react-dom");
const moment = require("moment");

const variants = ["01:00", "02:00", "03:00", "04:00", "05:00", "07:00", "10:00", "15:00", "20:00", "25:00", "30:00", "45:00"];

class Timer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            remainingTimeClass: "normal",
            remainingTimeSource: "05:00",
            currentTime: moment().format("HH:mm:ss"),
            currentDate: moment().locale("ru").format("DD.MM.YYYY, dddd")
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            remainingTimeClass: "normal",
            remainingTimeSource: "05:00",
            currentTime: moment().format("HH:mm:ss"),
            currentDate: moment().locale("ru").format("DD.MM.YYYY, dddd")
        });
    }

    setTime(v) {
        this.setState({remainingTimeSource: v.target.outerText});
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
                <div className={this.state.remainingTimeClass}>
                    {this.state.remainingTimeSource}
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

/*
<div class="variants">
        <div v-for="variant in variants" style="display: inline; margin: 0 auto; width: 100%">
            <a href="#" @click="setTime(variant)">{{variant}}</a>&nbsp;
        </div>
    </div>
    <div :class="remainingTimeClass">
        {{ remainingTime }}
    </div>
    <br/>
    <div class="currentTime">
        {{ currentTime }}
    </div>
    <div class="currentDate">
        {{ currentDate }}
    </div>
 */
