import './DropDown.css'
import { Link } from 'react-router-dom'
import { useState } from "react"

interface propTypes {
	btnClass: string,
	text: string,
	img: string,
	imgClass: string,
	options: string[],
	panelClass: string
}

export default function DropDown(props: propTypes) {
	const [isExpanded, setIsExpanded] = useState(false)

	return (
		<>
			<button
				className={props.btnClass}
				onClick={() => setIsExpanded(!isExpanded)}
			>
				{props.text}
				{props.imgClass === "" ?
					<></> :
					<img className={props.imgClass} src={props.img}></img>
				}
			</button>
			{isExpanded &&
				<div
					className={props.panelClass}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{props.options.map(option => (
						<span className="option" key={option}><Link to={props.text + "/" + option}>{option}</Link></span>
					))}
				</div>
			}
		</>
	)
}
