import { eventChannel } from 'redux-saga'
import { fork, put, take, call, cancel } from 'redux-saga/effects'
import SocketClient from '../../lib/socket_client.js'
import auth from '../../lib/auth'
//actions
import { error } from '../actions'
import { displayConnectionStatusToast } from './actions'

import {
	SEND,
	LOGIN_SUCCESS,
	CONNECTED,
	CONNECTION_STATUS_TOAST
} from '../constants'

const { getUser } = auth
let socketInstance = null

export const getSocketInstance = () => socketInstance

export const subscribe = function (socket) {
	return new eventChannel(emitter => {
		//socket - general - start
		socket.on('api-error', err => emitter(error(err)))
		socket.on('connect_error', () => {
			emitter(displayConnectionStatusToast(true))
		})
		socket.on('reconnect', () => {
			emitter(displayConnectionStatusToast(false))
		})
		//socket - general - end

		const unsubscribe = () => {
			socket.off()
		}
		return unsubscribe
	})
}

const receive = function* (socket) {
	const channel = yield call(subscribe, socket)
	while (true) {
		let action = yield take(channel)
		console.log('RECEIVE [ ' + socket.id + ' ]',action)
		// in order to handle errors by root saga we must throw new error
		if (getUser() && action && action.type && action.type === 'ERROR') {
			throw action
		}
		yield put(action)
	}
}

const send = function* (socket) {
	while (true) {
		const { serverEventName, data } = yield take(SEND)
		console.log('SEND    [ ' + socket.id + ' ]' ,serverEventName, data)
		socket.emit(serverEventName, data)
	}
}

export const connect = async () => {
	const client = new SocketClient()
	socketInstance = await client.connect()
	return socketInstance
}

export const initSocket = function* () {
	while(true) {
		//disconnect if we previously have some socket instance
		if (socketInstance) {
			socketInstance.disconnect()
		}
		//make new socket connection
		let socket
		try {
			socket = yield call(connect)
		} catch (e) {
			//case when initial socket connect fails (reason: server is down)
			yield put({ type: CONNECTION_STATUS_TOAST, show: true })
			//prevent this saga to any further (the page must be refreshed)
			break
		}
		const receiveSaga = yield fork(receive, socket)
		const sendSaga = yield fork(send, socket)
		//add all event listeners
		const channel = yield call(subscribe, socket)
		yield put({ type: CONNECTED, socketId: socket.id, channel, socket })
		//wait for next login to make another while iteration
		yield take(LOGIN_SUCCESS)
		//stop old sagas to avoid sending messages to multiple connections
		yield cancel(receiveSaga)
		yield cancel(sendSaga)
	}
}
