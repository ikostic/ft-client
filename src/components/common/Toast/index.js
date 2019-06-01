import { toast } from 'react-toastify'
import './toast.css'

const connectionError = () => {
	return toast.error('CONNECTION LOST', {
		position: toast.POSITION.BOTTOM_CENTER,
		autoClose: false,
		className: 'toast-connectio-error'
	})
}

const connectionErrorUpdated = toastId => {
	toast.update(toastId, {
		type: toast.TYPE.SUCCESS,
		autoClose: 2000,
		render: "CONNECTION ESTABLISHED"
	})
}

export default {
	connectionError,
	connectionErrorUpdated
}
