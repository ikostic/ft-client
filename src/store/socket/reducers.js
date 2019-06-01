import {
	ERROR,
	CONNECTION_STATUS_TOAST
} from './constants'
import commonComponents from '../../components/common'

const { connectionError, connectionErrorUpdated } = commonComponents.Toast

// The initial application state
let initialState = {
	error: null,
	isConnected: null,
	connectionLostToastId: null
}

export default (state = initialState, action) => {
	switch (action.type) {
		case ERROR:
			return { ...state, error: action.data }
		case CONNECTION_STATUS_TOAST:
		if (state.connectionLostToastId === null && action.show) {
			const toastId = connectionError()
			return { ...state, connectionLostToastId: toastId }
		}
		if (!action.show) {
			connectionErrorUpdated(state.connectionLostToastId)
			return { ...state, connectionLostToastId: null }
		}
		return { ...state }
		default:
			return state
	}
}
