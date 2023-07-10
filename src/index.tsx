import "./index.scss"
import "bootstrap"

import React from "react"
import {createRoot} from "react-dom/client"
import moment from "moment"

import Timer from "./timer"

const variants = [1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 45]

const root = createRoot(document.getElementById("app"))
root.render(<Timer audio={new Audio("beep.wav")} window={window} moment={moment} variants={variants} calendarURL={"../prod-cal-ui"}/>)
