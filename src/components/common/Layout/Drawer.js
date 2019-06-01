import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Drawer, { DrawerContent, DrawerHeader, DrawerTitle } from '@material/react-drawer'
import List, { ListItemGraphic, ListItemText } from '@material/react-list'
import MaterialIcon from '@material/react-material-icon'

import { logout } from '../../../store/actions'
import auth from '../../../lib/auth'
import { trim, lTrim, ucWords } from '../../../lib/utils'
import navData from '../../../nav_config'

import './drawer.css'

const { loggedIn } = auth

const pathSeparator = '/'
const homeLabel = 'Home'
const BreadCrumbsShowHome = true

const NavLink = (props) => {
	const { path, className, icon, label, selected, onClick } = props
	return (
		<Link to={ path } className={ 'mdc-list-item' + (className ? ' ' + className : '') + (selected ? ' mdc-list-item--activated selected' : '')} onClick={ onClick ? onClick : () => {}}>
			<ListItemGraphic graphic={<MaterialIcon icon={ icon }/>}/>
			<ListItemText primaryText={ label }/>
		</Link>
	)
}

const getTree = (key, parent) => {
	const tree = parent ? parent.subs : navData
	if (tree[key]){
		return tree
	}
	for (let subKey in tree){
		if (tree[subKey].subs){
			const subTree = getTree(key, tree[subKey])
			if (subTree && subTree[key]){
				return { [subKey]: tree[subKey], ...subTree }
			}
		}
	}
	return null
}

const NavTree = (props) => {
	const { location, onClick } = props
	const currentPath = location.pathname
	const tree = getTree(currentPath)
	if (!tree){
		return null
	}
	const currentItem = tree[currentPath]
	//const pathArr = lTrim(currentPath, pathSeparator).split(pathSeparator)
	//const level = pathArr.length - 1
	//const isRootLevel = level === 0
	return (
		<>
			{ currentItem && currentItem.subs ? (
				<>
					<NavLink selected={ true } path={ currentPath } icon={ currentItem.icon } label={ currentItem.label } onClick={ onClick ? onClick : () => {}}/>
					{ Object.keys(currentItem.subs).map((key, i) => {
						const subItem = currentItem.subs[key]
						return (
							<NavLink key={ key } path={ key } icon={ subItem.icon } label={ subItem.label } onClick={ onClick ? onClick : () => {}}/>
						)
					})}
				</>
			) : Object.keys(tree).map((key, i) => {
				const item = tree[key]
				return (
					<NavLink selected={ key === currentPath } key={ key } path={ key } icon={ item.icon } label={ item.label } onClick={ onClick ? onClick : () => {}}/>
				)
			})}
		</>
	)
}

const labelize = (string) => {
	return trim(ucWords(string.replace(/[/\-_]/gi, ' ')))
}

const BreadCrumbs = (props) => {
	const { location } = props
	const currentPath = location.pathname
	const pathArr = lTrim(currentPath, pathSeparator).split(pathSeparator)
	//const level = pathArr.length - 1
	const bcArr = []
	let bcPath = ''
	//let parentPath = ''
	pathArr.forEach((pathItem, index) => {
		//parentPath = bcPath

		bcPath += pathSeparator + pathItem
		const bcTree = getTree(bcPath)
		const bcItem = bcTree ? bcTree[bcPath] : null
		bcArr.push({
			path: bcPath,
			label: bcItem ? bcItem.label : labelize(pathItem) || homeLabel,
			icon: pathItem,
			level: index
		})
	})
	//const parent = level === 0 ? null : bcArr[level - 1]
	const showHome = bcArr[0] && bcArr[0].path !== pathSeparator && BreadCrumbsShowHome
	return bcArr.length === 1 && bcArr[0].path === pathSeparator ? null : (
		<div className="breadcrumbs">
			{ showHome ? (
				<div>
					<Link className="bc" to={ pathSeparator }>{ homeLabel }</Link>
				</div>
			) : null }
			{ bcArr.map((bc, index) => (
				<div key={ 'bc-' + index }>
					{ index === 0 && !showHome ? null : (
						<div className="bc-separator"/>
					)}
					{ bcArr.length === index + 1 ? (
						<span className="bc-label">{ bc.label }</span>
					) : (
						<Link className="bc" to={ bc.path }>{ bc.label }</Link>
					)}
				</div>
			))}
		</div>
	)
}

const NavBack = (props) => {
	const { location } = props
	const currentPath = location.pathname
	const pathArr = lTrim(currentPath, pathSeparator).split(pathSeparator)
	if (pathArr.length < 2 && (!navData[currentPath] || !navData[currentPath].subs)){
		return null
	}
	pathArr.pop(navData)
	const path = pathSeparator + pathArr.join(pathSeparator)
	return (
		<Link className="nav-back" to={ path }><MaterialIcon icon="arrow_back"/></Link>
	)
}

class DrawerRaw extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
			modal: true
		}
		this.close = this.close.bind(this)
		this._logout = this._logout.bind(this)
	}
	close(){
		this.setState({ open: false })
	}
	_logout(e) {
		e.preventDefault()
		e.stopPropagation()
		e.nativeEvent.stopImmediatePropagation()
		this.props.dispatch(logout())
	}
	static getDerivedStateFromProps(props, state) {
		if (props.isOpen !== state.open || props.isModal !== state.modal) {
			return {
				open: props.isOpen,
				modal: props.isModal
			}
		}
		return null
	}
	render () {
		const { location, onClose } = this.props
		const pathLabel = labelize(location.pathname)
		return (
			<Drawer dismissible={ !this.state.modal } modal={ this.state.modal } open={ this.state.open } onClose={ onClose ? onClose : () => this.setState({ open: false })}>
				<DrawerHeader>
					<div className="pov">
						<NavBack { ...this.props }/>
						<DrawerTitle tag="h2">
							{ this.props.label || (pathLabel && pathLabel !== '' ? pathLabel : homeLabel)}
						</DrawerTitle>
						<BreadCrumbs { ...this.props }/>
					</div>
				</DrawerHeader>
				<DrawerContent>
					<List>
						<NavTree { ...this.props } onClick={ this.state.modal && onClose ? onClose : () => this.setState({ open: false })}/>
						<hr className="mdc-list-divider"/>
						{ loggedIn() ? (
						<a href="logout" className="mdc-list-item" onClick={ this._logout }>
							<ListItemGraphic graphic={<MaterialIcon icon="logout"/>}/>
							<ListItemText primaryText="Logout"/>
						</a>
						) : (
						<section>
							<NavLink { ...this.props } path="/login" icon="exit_to_app" label="Login" onClick={ this.state.modal && onClose ? onClose : () => this.setState({ open: false })}/>
							<NavLink { ...this.props } path="/register" icon="person_add" label="Register" onClick={ this.state.modal && onClose ? onClose : () => this.setState({ open: false })}/>
						</section>
						)}
					</List>
				</DrawerContent>
			</Drawer>
		)
	}
}

const stateToProps = () => ({})

export default connect(stateToProps)(withRouter(props => <DrawerRaw {...props}/>))
