import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import './RegistrationConfirmation.css'

const RegistrationConfirmation = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  
  const { lastRegistration } = useSelector((state) => state.registrations)
  const { items: events } = useSelector((state) => state.events)
  
  const event = events.find(e => e.id === parseInt(eventId))

  useEffect(() => {
    // If there's no last registration, redirect to home
    if (!lastRegistration) {
      navigate('/')
    }
  }, [lastRegistration, navigate])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatDateTime = (isoString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(isoString).toLocaleDateString(undefined, options)
  }

  if (!lastRegistration || !event) {
    return null
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">
          <i className="pi pi-check-circle"></i>
        </div>
        
        <h1>Registration Successful!</h1>
        
        <Message 
          severity="success" 
          text="You have successfully registered for the event. A confirmation email will be sent to your registered email address."
          className="confirmation-message"
        />

        <div className="confirmation-cards">
          <Card className="confirmation-card">
            <h2>
              <i className="pi pi-calendar-plus"></i>
              Event Details
            </h2>
            <div className="detail-group">
              <div className="detail-item">
                <span className="detail-label">Event Name:</span>
                <span className="detail-value">{event.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(event.date)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{event.location}</span>
              </div>
              <div className="detail-item description">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{event.description}</span>
              </div>
            </div>
          </Card>

          <Card className="confirmation-card">
            <h2>
              <i className="pi pi-user"></i>
              Your Registration Details
            </h2>
            <div className="detail-group">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{lastRegistration.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{lastRegistration.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{lastRegistration.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registration ID:</span>
                <span className="detail-value">#{lastRegistration.registrationId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registered On:</span>
                <span className="detail-value">{formatDateTime(lastRegistration.registeredAt)}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="confirmation-actions">
          <Button
            label="Back to Events"
            icon="pi pi-arrow-left"
            className="p-button-outlined action-button"
            onClick={() => navigate('/')}
          />
          <Button
            label="View My Registrations"
            icon="pi pi-list"
            className="action-button"
            onClick={() => navigate('/my-registrations')}
          />
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>
              <i className="pi pi-envelope"></i>
              Check your email for the confirmation and event details
            </li>
            <li>
              <i className="pi pi-calendar"></i>
              Add the event to your calendar
            </li>
            <li>
              <i className="pi pi-bell"></i>
              You will receive a reminder before the event
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RegistrationConfirmation

