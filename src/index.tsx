import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import App from './App'
import reducer from './store'
import thunk from 'redux-thunk'
import 'antd/dist/antd.css'
const store = createStore(reducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
