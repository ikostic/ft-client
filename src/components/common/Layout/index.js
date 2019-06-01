import React from 'react'
import Header from './Header'
import Drawer from './Drawer'
import sassVars from '../../../_config.scss'

const { _breakPointMediumHigh } = sassVars

class Layout extends React.Component {
	constructor(props){
		super(props)
		const wider = window ?  window.innerWidth > _breakPointMediumHigh : false
		this.state = {
			width: 0,
			height: 0,
			drawerOpen: wider,
			drawerDismissible: wider
		}
		this.resize = this.resize.bind(this)
		this.toggleDrawer = this.toggleDrawer.bind(this)
		this.drawerOnClose = this.drawerOnClose.bind(this)
	}
	resize(){
		if (window){
			const wider = window.innerWidth > _breakPointMediumHigh
			this.setState({ width: window.innerWidth, height: window.innerHeight, drawerOpen: wider, drawerDismissible: wider })
		}
	}
	toggleDrawer(){
		this.setState({ drawerOpen: !this.state.drawerOpen })
	}
	drawerOnClose(){
		this.setState({ drawerOpen: false })
	}
	componentDidMount() {
		if (window){
			window.addEventListener('resize', this.resize)
			this.resize()
		}
	}
	componentWillUnmount() {
		if (window){
			window.removeEventListener('resize', this.resize)
		}
	}
	render () {
		const { children } = this.props
		return (
			<div className="app-flex full-height">
				<div className="app-flex-top">
					<Header toggleDrawer={ this.toggleDrawer }/>
				</div>
				<div className="app-flex-bottom">
					<div className="content-flex full-height">
						<div className="content-flex-left full-height">
							<Drawer isOpen={ this.state.drawerOpen } isModal={ !this.state.drawerDismissible } onClose={ this.drawerOnClose }/>
						</div>
						<div className="content-flex-center full-height">
							{ children }
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Layout
