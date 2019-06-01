import axios from 'axios'
import localStorage from './local_storage'
import { isDefined } from './utils'

const endpoints = {
	//natural person
	register: '/login/natural/register',
	login: '/login/natural/login',
	userList: 'login/natural/list',
	//chats
	chatRoom: '/chat/room',
	chatPeer: '/chat/peer',
	//contacts
	contactsList: '/contacts/contact/list',
	createContact: '/contacts/contact',
	editContact: '/contacts/contact/',
	//contact info
	createContactInfo: '/contacts/contactInfo',
	editContactInfo: '/contacts/contactInfo/',
	contactInfoList: '/contacts/contactInfo/list',
	//file manager
	fileManagerList: '/storage/storage/list',
	fileManagerCreateDir: '/storage/storage/create-dir',
	fileManagerUpload: '/storage/storage/upload',
	fileManagerRemove: '/storage/storage/remove',
	fileManagerMove: '/storage/storage/move',
	fileManagerCopy: '/storage/storage/copy',
	//lookup tables
	listMetadata: '/lookup/metadata/list',
	getMetadata: '/lookup/metadata/',
	listLanguages: '/lookup/language/list',
	getLanguage: '/lookup/language/',
	listCountries: '/lookup/country/list',
	getCountry: '/lookup/country/',
}

const baseApiURL = (()=> {
	try {
		return 'https://' +  window.location.hostname + ':4433'
	} catch(e) {
		console.log('ReferenceError catched when running tests')
	}
})()

const createAxiosInstance = token => {
	return axios.create({
		headers: {
			Authorization: 'Bearer ' + token
		},
		// validateStatus: status => {
		// 	console.log("STATUS ",status)
		// 	return true
		//   //return status >= 200 && status < 300; // default
		// },
		// transformResponse: [function (data) {
		// 	// Do whatever you want to transform the data
		// 	console.log('data', data)
		// 	return data;
		// }],
		timeout: 15000,
		responseType: 'json'
	})
}

const getToken = () => {
	return localStorage.getItem('token')
}

export const isFieldValid = (fieldName, errors = {}) => {
	let res = null
	//exact key
	res = !isDefined(errors[fieldName])

	//find in all keys partial match
	//e.g. result from api: errors.myContact.contactInfo.0.name.first: "This field is required"
	//find only 'name.first'
	if (res) {
		const partialMatchKey = Object.keys(errors).find(k => k.indexOf(fieldName) !== -1)
		if (partialMatchKey) {
			return false
		}
	}
	return res
}

export const getErrorMessage = (fieldName, errors = {}, partial = false) => {
	if (!partial) {
		return !isFieldValid(fieldName, errors) ? errors[fieldName] : null
	}

	const partialMatchKey = Object.keys(errors).find(k => k.indexOf(fieldName) !== -1)
	if (partialMatchKey) {
		return errors[partialMatchKey]
	}
}

let axiosInstance = createAxiosInstance(getToken())

const api = {
	login: (username, password, cb) => {
		return axiosInstance.post(baseApiURL + endpoints.login, {
			username,
			password
		})
		.then(response => {
			axiosInstance = createAxiosInstance(response.data.token)
			if (cb) {
				cb(response.data)
			}
			return response
		})
	},
	register: (data, cb) => {
		return axiosInstance.post(baseApiURL + endpoints.register, {
			...data
		})
	},
	logout: (data, cb) => {
		console.log('logout')
	},
	userList: (params) => {
		return axiosInstance.post(baseApiURL + endpoints.userList, params)
		.then(response => {
			return response
		})
	},
	//contact endpoints
	contactsList: () => {
		return axiosInstance.post(baseApiURL + endpoints.contactsList).then(res => res.data)
	},
	createContact: data => {
		return axiosInstance.post(baseApiURL + endpoints.createContact, data).then(res => res.data)
	},
	editContact: data => {
		return axiosInstance.put(baseApiURL + endpoints.editContact + data._id, data).then(res => res.data)
	},
	createContactInfo: data => {
		return axiosInstance.post(baseApiURL + endpoints.createContactInfo, data).then(res => res.data)
	},
	editContactInfo: data => {
		return axiosInstance.put(baseApiURL + endpoints.editContactInfo + data._id, data).then(res => res.data)
	},
	contactInfoList: query => {
		return axiosInstance.post(baseApiURL + endpoints.contactInfoList, query).then(res => res.data)
	},
	//file manager endpoints
	fileManagerList: () => {
		return axiosInstance.post(baseApiURL + endpoints.fileManagerList)
		.then(response => {
			return response
		})
	},
	fileManagerCreateDir: (path, name) => {
		return axiosInstance.post(baseApiURL + endpoints.fileManagerCreateDir, { path, name })
		.then(response => {
			return response
		})
	},
	fileManagerUpload: (files, onProgress) => {
		const config = {
			onUploadProgress: onProgress,
			timeout: 99999,
			headers: {
				'Content-Type': 'multipart/form-data'
			}/*,
			requestId: key*/
		}
		//axiosInstance.defaults.data = files
		return axiosInstance.post(baseApiURL + endpoints.fileManagerUpload, files, config)
		.then(response => {
			return response
		}).catch((err) => {
			console.log('upload error', err)
		})
	},
	fileManagerRemove: (path) => {
		return axiosInstance.delete(baseApiURL + endpoints.fileManagerRemove + '/' + encodeURIComponent(path))
		.then(response => {
			return response
		})
	},
	fileManagerMove: (path, target) => {
		return axiosInstance.post(baseApiURL + endpoints.fileManagerMove, { path, target })
		.then(response => {
			return response
		}).catch((err) => {
			console.log('move error', err)
		})
	},
	fileManagerCopy: (path, target) => {
		return axiosInstance.post(baseApiURL + endpoints.fileManagerCopy, { path, target })
		.then(response => {
			return response
		}).catch((err) => {
			console.log('copy error', err)
		})
	},
	listMetadata: () => {
		return axiosInstance.post(baseApiURL + endpoints.listMetadata, {}).then(res => res.data)
	},
	getMetadata: (id) => {
		return axiosInstance.get(baseApiURL + endpoints.getMetadata + id, {})
	},
	listLanguages: () => {
		return axiosInstance.post(baseApiURL + endpoints.listLanguages, {}).then(res => res.data)
	},
	getLanguage: (id) => {
		return axiosInstance.get(baseApiURL + endpoints.getLanguage + id, {})
	},
	listCountries: () => {
		return axiosInstance.post(baseApiURL + endpoints.listCountries, {}).then(res => res.data)
	},
	getCountry: (id) => {
		return axiosInstance.get(baseApiURL + endpoints.getCountry + id, {})
	},
}

export default { ...api }
