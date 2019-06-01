import React from 'react'
import { connect } from 'react-redux'

import Message from '../Message'
import { changeForm } from '../../../store/actions.js'
import { setPropertyByPath } from '../../../lib/utils.js'
import Loader from '../Loader'
import './form.css'

class Form extends React.Component {
	constructor (props) {
		super(props)
		this._changeForm = this._changeForm.bind(this)
		this._emitChange = this._emitChange.bind(this)
		this._onSubmit = this._onSubmit.bind(this)
		this.state = {
			...this.props.data,
			error: ''
		}
	}

	_changeForm (e, cb) {
		const el = e.target || e
		let oldStore = { ...this.props.data }
		if (cb) {
			const res = cb(oldStore) || {}
			oldStore = { ...oldStore, ...res }
			this.setState({ ...oldStore })
		}
		if (el.name){
			const newFormState = setPropertyByPath(oldStore, el.name, el.value)
			this.setState({ ...newFormState })
		}
		this._emitChange(oldStore)
	}
	_emitChange (newFormState) {
		this.props.dispatch(changeForm(newFormState))
	}
	_onSubmit (event) {
		event.preventDefault()
		const formName = this.props.formName
		const formData = formName ? { ...this.props.data[formName] } : { ...this.props.data }
		if (!formData.error || formData.error === ''){
			delete formData.error
			this.props.onSubmit(formData)
		}
	}
	render () {
		const { children, error, id, loading } = this.props
		const formErrorMsg = error.message
		const updatedChildren = React.Children.map(children, child => {
			//add some additional props to form children
			if (
				!child ||
				(child && !child.type.name) ||
				(child && [ 'br', 'TextField', 'RippledComponent' ].indexOf(child.type.name) !== -1)
			) { return child }
			return React.cloneElement(child, {
				'changeform': this._changeForm
			})
		})

		return loading ?
			<Loader loading locale /> :
			<form id={ id } className="form full-height" onSubmit={ this._onSubmit } onChange={ this._changeForm }>
				{ formErrorMsg ? <Message type="error" text={ formErrorMsg }/>: null }
				{ updatedChildren }
			</form>
	}
}

const stateToProps = (state) => ({
	data: state.common.formState,
	error: state.common.error,
	loading: state.common.loading
})

export default connect(stateToProps)(Form)
