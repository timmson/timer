import Vue from "vue";
import fullscreen from "vue-fullscreen";
import moment from "moment";

Vue.use(fullscreen);
let app = new Vue({
    el: "#app",
    data: {
        isStarted: false,
        audio: new Audio("beep.wav"),
        remainingTime: "",
        remainingTimeClass: "normal",
        remainingTimeSource: {
            minutes: 5,
            seconds: 0
        },
        variants: ["00:01", "02:00", "03:00", "04:00", "05:00", "07:00", "10:00", "15:00"],
        currentDate: "",
        currentTime: ""
    },
    methods: {
        setTime: function (variant) {
            this.isStarted = false;
            this.remainingTimeSource = {
                minutes: parseInt(variant.split(":")[0]),
                seconds: parseInt(variant.split(":")[1])
            };
            this.remainingTimeClass = "normal";
        },
        tickDown: function () {
            this.currentDate = moment().locale("ru").format("DD.MM.YYYY, dddd");
            this.currentTime = moment().format("HH:mm:ss");

            if (this.isStarted) {
                if (this.remainingTimeSource.seconds > 0) {
                    this.remainingTimeSource.seconds--;
                } else {
                    if (this.remainingTimeSource.minutes > 0) {
                        this.remainingTimeSource.minutes--;
                        this.remainingTimeSource.seconds = 59;
                    } else {
                        this.isStarted = false;
                        this.remainingTimeClass = "alert";
                        this.audio.play();
                    }
                }
            }

            this.remainingTime = this.remainingTimeSource.minutes.toString().padStart(2, "0") + ":" + this.remainingTimeSource.seconds.toString().padStart(2, "0");

            setTimeout(this.tickDown, 1000);
        }
    },
    created() {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 32) {
                this.isStarted = !this.isStarted;
            }
        });
        window.addEventListener("click", (event) => {
            this.isStarted = !this.isStarted;
        });
    },
    mounted() {
        this.tickDown();
    }
});
