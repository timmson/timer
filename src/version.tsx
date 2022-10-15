import React from "react"

type VersionProps = {
    year: string,
    oldUrl: string
}

export default function Version(props: VersionProps) {
	return (
		<div className="row">
			<div className="col" style={{textAlign: "right", color: "#666"}}>
                Версия {props.year} года. Ищете <a href={props.oldUrl}>старую версию</a>?
			</div>
		</div>
	)
}
