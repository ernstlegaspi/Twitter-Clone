import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { apiSlice } from './slices/apiSlice'

import App from './App'

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
)
