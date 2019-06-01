import api from './api'
import localStorage from './local_storage'

const auth = {
	/**
	 * Logs a user in, returning a promise with `true` when done
	 * @param { string } username The username of the user
	 * @param { string } password The password of the user
	 */
	login (username, password) {
		if (auth.loggedIn()) return Promise.resolve(true)

		return api.login(username, password)
			.then(response => {
				// Save token to local storage
				const { token, ...rest } = response.data
				localStorage.setItem('token', token)
				localStorage.setItem('user', JSON.stringify(rest))
				return Promise.resolve(true)
			})
	},
	/**
	* Logs the current user out
	*/
	logout () {
		return new Promise(resolve => {
			localStorage.removeItem('token')
			resolve(true)
		})
	},
	/**
	* Checks if a user is logged in
	*/
	loggedIn () {
		return !!localStorage.token
	},
	/**
	* Registers a user and then logs them in
	* @param { string } username The username of the user
	* @param { string } password The password of the user
	*/
	register (data) {
		return api.register(data)
			.then((registeredPerson) => {
				return auth.login(data.username, data.password)
			})
	},
	onChange () {},
	getUser () {
		return auth.loggedIn() ? JSON.parse(localStorage.getItem('user')) : null
	}
}

export default auth
