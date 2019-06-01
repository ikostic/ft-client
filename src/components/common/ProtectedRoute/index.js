import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../../lib/auth.js'
import { connect } from 'react-redux'
import { redirectAfterLogin } from '../../../store/actions.js'

const { getUser } = auth

class ProtectedRoute extends Component {
	componentWillMount() {
		const user = getUser()
		const { path } = this.props
		if (user && Component) {
			this.props.dispatch(redirectAfterLogin(null))
		} else {
			this.props.dispatch(redirectAfterLogin(path))
		}
	}

	render() {
		const { component: Component, ...rest } = this.props
		const user = getUser()
		return (
			<Route { ...rest } render={() => {
				if (user && Component) {
					const componentWithProps = <Component { ...rest } user={ user } />
					if (this.props.render) {
						return this.props.render(componentWithProps)
					}
					return componentWithProps
				} else {
					return <Redirect to='/login' />
				}
			}} />
		)
	}
}

export default connect()(ProtectedRoute)
