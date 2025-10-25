import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import EventList from './pages/EventList'
import EventRegistration from './pages/EventRegistration'
import RegistrationConfirmation from './pages/RegistrationConfirmation'
import MyRegistrations from './pages/MyRegistrations'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/register/:eventId" element={<EventRegistration />} />
        <Route path="/confirmation/:eventId" element={<RegistrationConfirmation />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
      </Routes>
    </Layout>
  )
}

export default App

