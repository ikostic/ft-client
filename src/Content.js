import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
//import common from './components/common'
import { connect } from 'react-redux'
/* routes */
import Home from './components/home'
import Dashboard from './components/dashboard'
import About from './components/about'
import Themer from './components/themer'
import Login from './components/login'
import Register from './components/register'
import NotFound from './components/not_found'
import auth from './lib/auth.js'
import Loader from './components/common/Loader'
import { loadInitData } from './store/actions'

const { getUser } = auth
//const { ProtectedRoute } = common
const defaultRedirectPth = '/dashboard'

const checkAndRedirectTo = component => {
	if (getUser()) {
		return <Redirect to={ defaultRedirectPth }/>
	} else {
		return component
	}
}

class Content extends Component {
	componentWillMount() {
		this.props.dispatch(loadInitData())
	}

	render() {
		const { initLoading } = this.props
		return (
			<main className="main-content scrollable" id="main-content">
				{ initLoading ?
					<Loader loading /> :
					<Switch>
						<Route exact path="/" render={() => <Home /> }/>
						<Route path="/dashboard" component={ Dashboard }/>
						<Route path="/about" component={ About }/>
						<Route path="/themer" component={ Themer }/>
						<Route path="/login" render={ checkAndRedirectTo.bind(this, <Login/>)}/>
						<Route path="/register" render={ checkAndRedirectTo.bind(this, <Register/>)}/>
						<Route exact path="*" component={ NotFound }/>
					</Switch>
				}
			</main>
		)
	}
}

const stateToProps = state => ({
	initLoading: state.common.initLoading
})

export default connect(stateToProps)(Content)
