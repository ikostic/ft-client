import { take, call, put, race, select } from 'redux-saga/effects'
import { forwardTo } from '../lib/utils'
import auth from '../lib/auth'

import {
	CHANGE_FORM,
	SENDING_REQUEST,
	REQUEST_ERROR,
	LOGIN_REQUEST,
	REGISTER_REQUEST,
	SET_AUTH,
	LOGOUT,
	LOGIN_SUCCESS,
	LOAD_INIT_DATA,
	SET_INIT_LOADING,
	LOADING
} from './constants'

const authRoutes = {
	protectedLanding: '/dashboard',
	unprotectedLanding: '/',
	login: '/login'
}

/**
 * Effect to handle authorization
 * @param { string } username The username of the user
 * @param { string } password The password of the user
 * @param { object } options Options
 * @param { boolean } options.isRegistering Is this a register request?
 */
export const authorize = function* ({ username, password, isRegistering }) {
		yield put({ type: SENDING_REQUEST, sending: true })

		const hash = password
		let response

		if (isRegistering) {
			response = yield call(auth.register, username, hash)
		} else {
			response = yield call(auth.login, username, hash)
		}
		return response
}

/**
 * Effect to handle logging out
 */
export const logout = function* () {
	yield put({ type: SENDING_REQUEST, sending: true })

	try {
		const response = yield call(auth.logout)
		yield put({ type: SENDING_REQUEST, sending: false })

		return response
	} catch (error) {
		yield put({ type: REQUEST_ERROR, error: error.message })
	}
}

/**
 * Log in saga
 */
export const loginFlow = function* () {
	while (true) {
		const request = yield take(LOGIN_REQUEST)
		const { username, password } = request.data

		// A `LOGOUT` action may happen while the `authorize` effect is going on, which may
		// lead to a race condition. This is unlikely, but just in case, we call `race` which
		// returns the "winner", i.e. the one that finished first
		const winner = yield race({
			auth: call(authorize, { username, password, isRegistering: false }),
			logout: take(LOGOUT)
		})

		// If `authorize` was the winner...
		if (winner.auth) {
			// ...we send Redux appropiate actions
			yield put({ type: SET_AUTH, newAuthState: true }) // User is logged in (authorized)
			yield put({ type: CHANGE_FORM, newFormState: { username: '', password: '' }}) // Clear form
			yield put({ type: LOGIN_SUCCESS })
			yield select(state => {
				const redirectAfterLogin = state.common.redirectAfterLogin
				if (redirectAfterLogin) {
					// redirect to previously requested protected route
					forwardTo(forwardTo(redirectAfterLogin))
				} else {
					// go to dashboard page
					forwardTo(authRoutes.protectedLanding)
				}
			})
			yield put({ type: LOAD_INIT_DATA })
		}
	}
}

/* Log out saga */
export const logoutFlow = function* () {
	while (true) {
		yield take(LOGOUT)
		yield put({ type: SET_AUTH, newAuthState: false })
		yield call(logout)
		forwardTo(authRoutes.login)
	}
}

/* Register saga */
export const registerFlow = function* () {
	while (true) {
		yield take(REGISTER_REQUEST)
		const store = yield(select())
		const payload = store.common.formState
		yield put({ type: SENDING_REQUEST, sending: true })
		yield call(auth.register, payload)
		yield put({ type: SENDING_REQUEST, sending: false })
		forwardTo(authRoutes.protectedLanding)
	}
}

export const loading = function* (flag = true, type = 'default') {
	const defaultLoading = { type: LOADING, loading: flag }
	switch (type) {
		case 'default':
			yield put(defaultLoading)
			return
		case 'init':
			yield put({ type: SET_INIT_LOADING, flag })
			return
		default:
			yield put(defaultLoading)
	}
}
