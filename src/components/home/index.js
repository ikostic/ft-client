import React from 'react'
import Button from '@material/react-button'

import './home.css'

const floorIdPrefix = 'floor_'
const floorsTotal = 15
const floors = [{ id: 0, label: 'Door in the loby' }]

const ordered = num => {
	const suffix = 'th'
	const suffixExceptions = ['st','nd','rd']
	const str = num + ''
	const lastDigit = parseInt(str.charAt(str.length - 1), 10) - 1
	return num + ([11,12,13].indexOf(num) === -1 && suffixExceptions[lastDigit] ? suffixExceptions[lastDigit] : suffix)
}

for (let i = 0; i < floorsTotal; i++){
	const id = i + 1
	floors.push({ id, label: 'Door on the ' + ordered(id) + ' floor activated!' })
}

floors.reverse()

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			search: ''
		}
		this.activateDoor = this.activateDoor.bind(this)
	}

	activateDoor(id) {
		if (document){
			document.querySelector('#' + id).classList.toggle('active')
		}
	}

	render() {
		return (
			<div className="full-height">
				<div className="pov building-bg">
					<div className="abs-wrapper floors">
						{ floors.map(floor => {
							return (
								<div key={ 'floorKey_' + floor.id } id={ floorIdPrefix + floor.id } className="floor">
									<div className="hole"/>
									<div className="indicator"/>
									{ floor.label }
								</div>
							)
						})}
					</div>
					<div className="control-panel scrollable-wrapper">
						<div className="scrollable">
						{ floors.map(floor => {
							return (
								<Button key={ 'buttonKey_' + floor.id } onMouseOver={() => { this.activateDoor(floorIdPrefix + floor.id)}} onMouseOut={() => { this.activateDoor(floorIdPrefix + floor.id)}}>
									Activate door at floor { floor.id }
								</Button>
							)
						})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Home
