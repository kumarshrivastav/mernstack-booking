import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux"
import { persistor, store } from './state/store.js'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer/>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}/>
    <App />
    </Provider>
  </React.StrictMode>,
)
