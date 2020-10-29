import React from 'react'
import Layout from './Containers/Layout'
import { BrowserRouter as Router } from 'react-router-dom'
import { MovieContextProvider } from './Context'
import './App.scss'

function App() {
  return (
    <MovieContextProvider>
      <Router>
        <Layout />
      </Router>
    </MovieContextProvider>
  )
}

export default App
