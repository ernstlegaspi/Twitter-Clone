import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

import App from './App'
import authReducer from './slices/auth/authSlice'
import tweetReducer from './slices/tweet/tweetSlice'
import userReducer from './slices/user/userSlice'

import './index.css'

const persistConfig = { key: "root", storage, version: 1 }

const auth = persistReducer(persistConfig, authReducer)
const tweet = persistReducer(persistConfig, tweetReducer)
const user = persistReducer(persistConfig, userReducer)

const store = configureStore({
	reducer: {
		auth,
		tweet,
		user
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<React.StrictMode>
			<PersistGate loading={null} persistor={persistStore(store)}>
				<App />
			</PersistGate>
		</React.StrictMode>
	</Provider>
)
