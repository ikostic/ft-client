import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import './loader.css'

const Loader = (props) => (
	<div className={ 'loader-backdrop' + (props.loading ? '-show' : '') + (props.locale ? ' loader-locale' : '') + (props.className ? ' ' + props.className : '')}>
		<div className="loader-wrapper">
			<div className={ 'loader-progress' + (props.progress ? '-show' : '')}>{ props.progress || '' }</div>
			<div className="loader-indicator"><MaterialIcon icon={ props.icon || 'location_searching' }/></div>
		</div>
	</div>
)

export default Loader
