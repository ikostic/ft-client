import React from 'react'
import TopAppBar, {
	TopAppBarIcon,
	TopAppBarRow,
	TopAppBarSection,
	TopAppBarTitle
} from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'

class Header extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			search: ''
		}
		this.hendleSearch = this.hendleSearch.bind(this)
	}

	hendleSearch(e) {
		const value = e.target.value
		this.setState({ search: value })
	}

	render() {
		const { toggleDrawer } = this.props
		return (
			<TopAppBar className="rel mdc-elevation--z7">
				<TopAppBarRow>
					<TopAppBarSection align="start">
						<TopAppBarIcon navIcon tabIndex={ 0 }>
							<MaterialIcon hasRipple icon="menu" onClick={ toggleDrawer || null }/>
						</TopAppBarIcon>
						<TopAppBarTitle>{ this.props.label || 'FireTec' }</TopAppBarTitle>
					</TopAppBarSection>
					<TopAppBarSection align="end" role="toolbar">
						<TopAppBarIcon actionItem tabIndex={ 0 }>
							<MaterialIcon className="md-36" aria-label="print" hasRipple icon="print" onClick={() => console.log('print')}/>
						</TopAppBarIcon>
					</TopAppBarSection>
				</TopAppBarRow>
			</TopAppBar>
		)
	}
}

export default Header
