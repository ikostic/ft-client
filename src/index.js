import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ToastContainer } from 'react-toastify'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Router } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

import registerServiceWorker from './registerServiceWorker'
import reducers from './store/reducers'
import rootSaga from './store/sagas'
import './main.css'
import history from './history'
import Content from './Content'
import common from './components/common'

const { Layout } = common

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(sagaMiddleware),
		//other middewares
	)
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
	<Provider store={ store }>
		<ToastContainer />
		<Router history={ history }>
			<Layout>
				<Content/>
			</Layout>
		</Router>
	</Provider>, document.getElementById('root'))
registerServiceWorker()
