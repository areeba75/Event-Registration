import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Message } from 'primereact/message'
import { fetchEventById, clearSelectedEvent } from '../store/slices/eventsSlice'
import { registerForEvent } from '../store/slices/registrationsSlice'
import './EventRegistration.css'

const EventRegistration = () => {
  const { eventId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { selectedEvent, loading: eventLoading } = useSelector((state) => state.events)
  const { loading: registrationLoading } = useSelector((state) => state.registrations)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    dispatch(fetchEventById(eventId))
    return () => {
      dispatch(clearSelectedEvent())
    }
  }, [dispatch, eventId])

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return ''
      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        const phoneRegex = /^[\d\s()+-]+$/
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number'
        if (value.replace(/\D/g, '').length < 10) return 'Phone number must be at least 10 digits'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    
    setErrors(newErrors)
    setTouched({ name: true, email: true, phone: true })
    
    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(registerForEvent({ eventId, userData: formData })).unwrap()
        navigate(`/confirmation/${eventId}`)
      } catch (error) {
        console.error('Registration failed:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (eventLoading) {
    return (
      <div className="loading-container">
        <ProgressSpinner />
        <p>Loading event details...</p>
      </div>
    )
  }

  if (!selectedEvent) {
    return (
      <div className="error-container">
        <Message severity="error" text="Event not found" />
        <Button label="Back to Events" icon="pi pi-arrow-left" onClick={() => navigate('/')} />
      </div>
    )
  }

  return (
    <div className="registration-page">
      <Button
        label="Back to Events"
        icon="pi pi-arrow-left"
        className="p-button-text back-button"
        onClick={() => navigate('/')}
      />

      <div className="registration-container">
        <Card className="event-info-card">
          <h2>Event Details</h2>
          <div className="event-info">
            <h3>{selectedEvent.name}</h3>
            <div className="info-item">
              <i className="pi pi-calendar"></i>
              <span>{formatDate(selectedEvent.date)}</span>
            </div>
            <div className="info-item">
              <i className="pi pi-map-marker"></i>
              <span>{selectedEvent.location}</span>
            </div>
            <p className="event-desc">{selectedEvent.description}</p>
          </div>
        </Card>

        <Card className="registration-form-card">
          <h2>Register for Event</h2>
          <form onSubmit={handleSubmit} className="registration-form" noValidate>
            <div className="form-field">
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <InputText
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? 'p-invalid' : ''}
                placeholder="Enter your full name"
                aria-required="true"
                aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
              />
              {errors.name && touched.name && (
                <small id="name-error" className="p-error" role="alert">
                  {errors.name}
                </small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? 'p-invalid' : ''}
                placeholder="Enter your email address"
                aria-required="true"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              />
              {errors.email && touched.email && (
                <small id="email-error" className="p-error" role="alert">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <InputText
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone && touched.phone ? 'p-invalid' : ''}
                placeholder="Enter your phone number"
                aria-required="true"
                aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
              />
              {errors.phone && touched.phone && (
                <small id="phone-error" className="p-error" role="alert">
                  {errors.phone}
                </small>
              )}
            </div>

            <Button
              type="submit"
              label={registrationLoading ? 'Submitting...' : 'Submit Registration'}
              icon={registrationLoading ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
              className="submit-button"
              disabled={registrationLoading}
            />
          </form>
        </Card>
      </div>
    </div>
  )
}

export default EventRegistration

