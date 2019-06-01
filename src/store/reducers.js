import { combineReducers } from 'redux'
import common from './commonReducers'
import socket from './socket/reducers.js'

export default combineReducers({
	common,
	socket
})
