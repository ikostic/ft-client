import { fork, call, put, all } from 'redux-saga/effects'
import { loginFlow, logoutFlow, registerFlow } from './commonSagas'
import { initSocket } from './socket/sagas'
import {
	LOGOUT,
	LOADING,
	REQUEST_ERROR,
	SET_INIT_LOADING
} from './constants'

// Wrap forks with an Error handler
const wrap = function* (fn, args) {
	try {
		yield call(fn, ...args)
	}
	catch (e) {
		const { response, data } = e
		yield put({ type: LOADING, flag: false })
		yield put({ type: SET_INIT_LOADING, flag: false })
		if (response || (data && data.statusCode)) {
			const status = response ? response.status : data.statusCode ? data.statusCode : null
			switch (status) {
				case 401:
					yield put({ type: LOGOUT })
					break
				case 400:
					yield put({ type: REQUEST_ERROR, error: response.data })
					break
				default:
			}
		}
		//reactivate stoped saga
		yield fork(wrap, fn, args)
	}
}

const forkWithErrHandler = (fn, ...args) => fork(wrap, fn, args)

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
const sagas = [
	initSocket,
	loginFlow,
	logoutFlow,
	registerFlow
].map(saga => {
	// add error handler to all sagas
	return forkWithErrHandler(saga)
})

const root = function* () {
	yield all( sagas )
}

export default root
