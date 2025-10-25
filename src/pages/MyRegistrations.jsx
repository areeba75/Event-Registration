import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Divider } from 'primereact/divider'
import './MyRegistrations.css'

const MyRegistrations = () => {
  const navigate = useNavigate()
  const registrations = useSelector((state) => state.registrations.items)
  const events = useSelector((state) => state.events.items)

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

  const getEventById = (eventId) => {
    return events.find(e => e.id === eventId)
  }

  return (
    <div className="my-registrations-page">
      <div className="page-header">
        <h1>My Registrations</h1>
        <p className="page-description">
          View all your event registrations and details
        </p>
      </div>

      {registrations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="pi pi-inbox"></i>
          </div>
          <h2>No Registrations Yet</h2>
          <p>You haven't registered for any events. Browse available events and register now!</p>
          <Button
            label="Browse Events"
            icon="pi pi-calendar"
            onClick={() => navigate('/')}
            className="browse-button"
          />
        </div>
      ) : (
        <div className="registrations-container">
          <div className="registrations-summary">
            <Card className="summary-card">
              <div className="summary-content">
                <i className="pi pi-ticket"></i>
                <div>
                  <h3>{registrations.length}</h3>
                  <p>Total Registrations</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="registrations-list">
            {registrations.map((registration) => {
              const event = getEventById(registration.eventId)
              
              if (!event) return null

              return (
                <Card key={registration.registrationId} className="registration-card">
                  <div className="registration-header">
                    <div className="event-badge">
                      <i className="pi pi-calendar-plus"></i>
                    </div>
                    <div className="registration-title">
                      <h2>{event.name}</h2>
                      <span className="registration-id">
                        Registration ID: #{registration.registrationId}
                      </span>
                    </div>
                  </div>

                  <Divider />

                  <div className="registration-content">
                    <div className="registration-section">
                      <h3>
                        <i className="pi pi-info-circle"></i>
                        Event Information
                      </h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Date:</span>
                          <span className="info-value">{formatDate(event.date)}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Location:</span>
                          <span className="info-value">{event.location}</span>
                        </div>
                        <div className="info-item full-width">
                          <span className="info-label">Description:</span>
                          <span className="info-value">{event.description}</span>
                        </div>
                      </div>
                    </div>

                    <Divider />

                    <div className="registration-section">
                      <h3>
                        <i className="pi pi-user"></i>
                        Registration Details
                      </h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Name:</span>
                          <span className="info-value">{registration.name}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email:</span>
                          <span className="info-value">{registration.email}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Phone:</span>
                          <span className="info-value">{registration.phone}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Registered On:</span>
                          <span className="info-value">
                            {formatDateTime(registration.registeredAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="registration-footer">
                    <Message
                      severity="success"
                      text="You're all set for this event!"
                      className="status-message"
                    />
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="page-actions">
            <Button
              label="Browse More Events"
              icon="pi pi-calendar"
              onClick={() => navigate('/')}
              className="p-button-outlined"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyRegistrations

