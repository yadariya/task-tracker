import React from 'react'
import Login from './pages/authentication/Login/Login'
import { store } from './store/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  )
}
