import React from "react"

// Декоративный SVG-слой: «жидкие» пятна, кольца и блики за стеклянными панелями.
export default function Decor() {

	const sparkles = [
		{cx: "12%", cy: "22%", r: 5},
		{cx: "82%", cy: "16%", r: 3},
		{cx: "68%", cy: "78%", r: 4},
		{cx: "26%", cy: "84%", r: 3},
		{cx: "46%", cy: "12%", r: 2},
		{cx: "92%", cy: "58%", r: 4},
		{cx: "6%", cy: "62%", r: 3}
	]

	return (
		<div className="decor" aria-hidden="true">
			<svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
				<defs>
					<radialGradient id="blob-a" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#7fd8ff" stopOpacity="0.55"/>
						<stop offset="100%" stopColor="#7fd8ff" stopOpacity="0"/>
					</radialGradient>
					<radialGradient id="blob-b" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#c07fff" stopOpacity="0.5"/>
						<stop offset="100%" stopColor="#c07fff" stopOpacity="0"/>
					</radialGradient>
					<radialGradient id="blob-c" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#5affc0" stopOpacity="0.35"/>
						<stop offset="100%" stopColor="#5affc0" stopOpacity="0"/>
					</radialGradient>
					<linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"/>
						<stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
					</linearGradient>
					<filter id="soften" x="-40%" y="-40%" width="180%" height="180%">
						<feGaussianBlur stdDeviation="30"/>
					</filter>
				</defs>

				<g filter="url(#soften)">
					<ellipse className="blob" cx="180" cy="150" rx="230" ry="190" fill="url(#blob-a)"/>
					<ellipse className="blob" cx="850" cy="210" rx="260" ry="200" fill="url(#blob-b)"/>
					<ellipse className="blob" cx="520" cy="640" rx="320" ry="180" fill="url(#blob-c)"/>
				</g>

				<g fill="none" stroke="url(#ring)" strokeWidth="1.5">
					<circle className="ring" cx="840" cy="120" r="90"/>
					<circle className="ring" cx="110" cy="560" r="140"/>
					<path className="wave" d="M-40 470 C 160 400 320 540 500 470 S 840 400 1040 470"/>
					<path className="wave" d="M-40 250 C 200 190 340 320 560 250 S 880 190 1040 250"/>
				</g>

				<g className="drops" fill="#ffffff">
					{sparkles.map((s, i) => <circle className="sparkle" key={i} cx={s.cx} cy={s.cy} r={s.r} opacity="0.5"/>)}
				</g>

				<g className="drops" fill="none" stroke="#ffffff" strokeOpacity="0.18">
					<circle cx="700" cy="330" r="26"/>
					<circle cx="330" cy="120" r="14"/>
					<circle cx="60" cy="330" r="20"/>
				</g>
			</svg>
		</div>
	)
}
