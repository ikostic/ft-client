import {
	ERROR,
	CONNECTION_STATUS_TOAST
} from './constants'

export const error = (data) => {
	return { type: ERROR, data }
}

export const displayConnectionStatusToast = (show = false) => {
	return { type: CONNECTION_STATUS_TOAST, show }
}
