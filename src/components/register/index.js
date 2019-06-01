import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField, { Input, HelperText } from '@material/react-text-field'
import Button from '@material/react-button/dist'
import { Grid, Row, Cell } from '@material/react-layout-grid'

import { registerRequest, startEditing } from '../../store/actions'
import './register.css'
import common from '../common'
import { isFieldValid } from '../../lib/api'

const { Form } = common

const RegisterForm = props => {
	const { username, password, repassword, first, errors } = props.data
	return (
		<Grid>
			<Row>
				<Cell columns={ 12 } tabletColumns={ 8 } phoneColumns={ 4 }>
					<p>Already registered? <Link to="/login">Login here</Link></p>
					<Form onSubmit={ props.register } formName="register" className="full-height form">
						<TextField
							label="First Name"
							helperText={ <HelperText>Type your first name here</HelperText> }>
							<Input
								id="register_first.name"
								isValid={isFieldValid("name.first", errors)}
								name="first"
								value={ first }/>
						</TextField>
						<TextField
							label="Username"
							helperText={ <HelperText>Type your email here</HelperText> }>
							<Input
								id="register_username"
								autoComplete="username"
								isValid={isFieldValid("username", errors)}
								name="username"
								value={ username }/>
						</TextField>
						<TextField
							label="Password"
							helperText={ <HelperText>Type your password here</HelperText> }>
							<Input
								id="register_password"
								autoComplete="new-password"
								isValid={isFieldValid("password", errors)}
								name="password"
								type="password"
								value={ password }/>
						</TextField>
						<TextField
							label="Retype Password"
							helperText={ <HelperText>Retype your password here</HelperText> }>
							<Input
								id="register_repassword"
								autoComplete="new-password"
								isValid={isFieldValid("repassword", errors)}
								name="repassword"
								type="password"
								value={ repassword }/>
						</TextField>
						<br />
						<Button raised className="button-alternate">Register</Button>
					</Form>
				</Cell>
			</Row>
		</Grid>
	)
}

class Register extends Component {
	constructor(props){
		super(props)
		this.handleRegister = this.handleRegister.bind(this)
	}

	handleRegister (data) {
		this.props.dispatch(registerRequest(data))
	}

	componentWillMount() {
		this.props.dispatch(startEditing('register'))
	}

	render(){
		return (
			<RegisterForm data={ this.props } register={ this.handleRegister }/>
		)
	}
}

const stateToProps = state => {
	const { username, password, repassword, first } = state.common.formState || {}
	return {
		username,
		password,
		repassword,
		first,
		errors: state.common.error ? state.common.error.errors : {}
	}
}

export default connect(stateToProps)(Register)
