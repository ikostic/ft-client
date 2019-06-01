import auth from '../lib/auth'
import { deepCopy } from '../lib/utils'

import {
	CHANGE_FORM,
	SENDING_REQUEST,
	REQUEST_ERROR,
	CLEAR_ERROR,
	SET_AUTH,
	LOADING,
	ERROR,
	REDIRECT_AFTER_LOGIN,
	SET_INIT_LOADING,
	SET_INIT_DATA,
	STOP_EDITING,
	START_EDITING,
	ADD_ITEM_TO_ARRAY,
	CHANGE_FORM_PROP
} from './constants'

const initFormState = {
	parentForm: null
}
// The initial application state
let initialState = {
	formState: { ...initFormState },
	loading: false,
	initLoading: false,
	redirectAfterLogin: null,
	loggedIn: auth.loggedIn(),
	user: auth.getUser(),
	error: {
		message: '',
		errors: {},
		errorStatusCode: null
	},
	currentlySending: false,

	//init data
	metadata: [],
	countries: [],
	languages: [],
	countryOptions: []
}

function reducer (state = {...initialState, init: deepCopy(initialState) }, action) {
	switch (action.type) {
		case START_EDITING:
			let data = {}
			//create new sub-form if we allready have one open
			if (state.formState.formName) {
				data.parentForm = deepCopy(state.formState)
			}
			if (action.data) {
				data = { ...data, ...action.data }
			}
			data = { ...data }
			data.formName = action.name
			return { ...state, formState: { ...data, originalEntity: deepCopy(data) } }
		case CHANGE_FORM:
			return { ...state, formState: action.newFormState }
		case CHANGE_FORM_PROP:
			let newFs = deepCopy(state.formState)
			newFs[action.key] = action.value
			return { ...state, formState: newFs }
		case STOP_EDITING:
			let formState = {}
			const error = { message: '', errors: {}, errorStatusCode: null }
			if (state.formState.parentForm) {
				//restore parent form and merge data from sub-form
				const subFormData = action.save ? deepCopy(state.formState) : {}
				if (subFormData.formName) { delete subFormData.formName }
				if (subFormData.parentForm) { delete subFormData.parentForm }
				if (subFormData.originalEntity) { delete subFormData.originalEntity }
				formState = { ...state.formState.parentForm, ...subFormData }
				if (!state.formState.parentForm.parentForm) { delete formState.parentForm }
			}
			return { ...state, formState: { ...formState }, error }
		case SENDING_REQUEST:
			return { ...state, currentlySending: action.sending }
		case REQUEST_ERROR:
			return { ...state, error: action.error }
		case CLEAR_ERROR:
			return { ...state, error: initialState.errors }
		case SET_AUTH:
			const newState = { ...state }
			newState.loggedIn = action.newAuthState
			newState.user = action.newAuthState ? auth.getUser() : null
			return newState
		case LOADING:
			return { ...state, loading: action.loading }
		case SET_INIT_LOADING:
			return { ...state, initLoading: action.flag }
		case SET_INIT_DATA:
		const { key, value } = action
			if (!key || !action) { return { ...state } }
			return { ...state, [key]: value}
		case REDIRECT_AFTER_LOGIN:
			return { ...state, redirectAfterLogin: action.path }
		case ADD_ITEM_TO_ARRAY:
			let fs = { ...state.formState }
			if (!action.key || !action.data) { return { ...state } }
			if (!fs[action.key]) {
				fs[action.key] = []
			}
			fs[action.key] = [ ...fs[action.key], action.data ]
			return { ...state, formState: fs }
		case ERROR:
			return { ...state, error: action.error }
		default:
			return state
	}
}

export default reducer
