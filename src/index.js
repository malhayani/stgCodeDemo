import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import Axios from 'axios'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/index'

Axios.defaults.baseURL = 'https://api.shred415.com/public'

ReactDOM.render(
    <Provider store={ createStore(rootReducer) }>
        <App />
    </Provider>, 
    document.getElementById('root')
)