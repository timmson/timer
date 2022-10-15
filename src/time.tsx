import React from "react"

type TimeProps = {
    moment: {
        format: (f: string) => string
    },
    calendarURL: string
}

export default function Time(props: TimeProps) {
	return (
		<div className="row">
			<div className="col currentTime">
				{props.moment.format("HH:mm:ss, dddd, ")}
				<a target={"_blank"} href={props.calendarURL} rel={"noreferrer"}>{props.moment.format("DD.MM.YYYY г.")}</a>
			</div>
		</div>
	)
}

