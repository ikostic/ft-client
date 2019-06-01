import React,{ Component } from 'react'
import { connect } from 'react-redux'
import TextField, { HelperText, Input } from '@material/react-text-field'
import Button from '@material/react-button/dist'
import './login.css'

import { loginRequest, startEditing } from '../../store/actions'
import common from '../common'

const { Form } = common

class Login extends Component {
	constructor(props){
		super(props)
		this.handleLogin = this.handleLogin.bind(this)
	}

	componentWillMount() {
		this.props.dispatch(startEditing('login'))
	}

	handleLogin (data) {
		const { username, password } = data
		this.props.dispatch(loginRequest({ username, password }))
	}

	render(){
		const { username, password } = this.props.data
		return (
			<>
				<Form id="login" onSubmit={ this.handleLogin } className="full-height">
					<div className="mdc-layout-grid">
						<div className="mdc-layout-grid__inner">
							<div className="mdc-layout-grid__cell">
								<TextField label="Username" helperText={<HelperText>Type your username or email here</HelperText>}>
								<Input
									autoComplete="username"
									id="username"
									name="username"
									value={ username }/>
								</TextField>
								<br />
								<TextField label="Password" helperText={<HelperText>Type your password here</HelperText>}>
								<Input
									autoComplete="new-password"
									id="password"
									name="password"
									type="password"
									value={ password }/>
								</TextField>
								<br />
								<Button raised className="button-alternate">Login</Button>
							</div>
						</div>
					</div>
				</Form>
			</>
		)
	}
}

const stateToProps = (state) => ({ data: state.common.formState })

export default connect(stateToProps)(Login)
