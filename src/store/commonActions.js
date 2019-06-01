/*
 * Actions describe changes of state in your application
 */

// Importing constants to name our actions' type
import {
	SENDING_REQUEST,
	REQUEST_ERROR,
	SET_AUTH,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	LOGOUT,
	LOADING,
	REDIRECT_AFTER_LOGIN,
	LOAD_INIT_DATA,
	SET_INIT_LOADING,
	SET_INIT_DATA,
	ADD_ITEM_TO_ARRAY,
	//form constants
		CLEAR_ERROR,
		CHANGE_FORM,
		STOP_EDITING,
		START_EDITING,
		CHANGE_FORM_PROP
} from './constants'

/**
 * Sets the form state
 * @param { object } newFormState The new state of the form
 * @param { string } newFormState.username The new text of the username input field of the form
 * @param { string } newFormState.password The new text of the password input field of the form
 */
export function changeForm (newFormState) {
	return { type: CHANGE_FORM, newFormState }
}

export function changeFormProp (key, value) {
	return { type: CHANGE_FORM_PROP, key, value }
}

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param { boolean } sending true means we're sending a request, false means we're not
 */
export function sendingRequest (sending) {
	return { type: SENDING_REQUEST, sending }
}

/**
 * Sets the `error` state to the error received
 * @param { object } error The error we got when trying to make the request
 */
export function requestError (error) {
	return { type: REQUEST_ERROR, error }
}

/**
 * Sets the `error` state as empty
 */
export function clearError () {
	return { type: CLEAR_ERROR }
}
/**
 * Sets the authentication state of the application
 * @param { boolean } newAuthState true means a user is logged in, false means no user is logged in
 */
export function setAuthState (newAuthState) {
	return { type: SET_AUTH, newAuthState }
}

/**
 * Tells the app we want to log in a user
 * @param { object } data The data we're sending for log in
 * @param { string } data.username The username of the user to log in
 * @param { string } data.password The password of the user to log in
 */
export function loginRequest (data) {
	return { type: LOGIN_REQUEST, data }
}

/**
 * Tells the app we want to log out a user
 */
export function logout () {
	return { type: LOGOUT }
}

/**
 * Tells the app we want to register a user
 * @param { object } data The data we're sending for registration
 * @param { string } data.username The username of the user to register
 * @param { string } data.password The password of the user to register
 */
export function registerRequest (data) {
	return { type: REGISTER_REQUEST, data }
}

export function loading (flag) {
	return { type: LOADING, loading: flag }
}

export function redirectAfterLogin (path) {
	return { type: REDIRECT_AFTER_LOGIN, path }
}

export function loadInitData () {
	return { type: LOAD_INIT_DATA }
}

export function setInitLoading (flag) {
	return { type: SET_INIT_LOADING, flag }
}

export function setInitData (key, value) {
	return { type: SET_INIT_DATA, key, value }
}

export const stopEditing = (saveState = true) => {
	return { type: STOP_EDITING, save: saveState }
}

export const startEditing = (formName, data) => {
	return { type: START_EDITING, name: formName, data }
}

export const addItemToArray = (key, data) => {
	return { type: ADD_ITEM_TO_ARRAY, key, data }
}
