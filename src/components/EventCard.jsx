import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import './EventCard.css'

const EventCard = ({ event, onRegister, isDragging, isActive }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: event.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const cardHeader = (
    <div className="event-card-header">
      <div 
        className="drag-handle"
        {...attributes}
        {...listeners}
        role="button"
        aria-label={`Drag to reorder ${event.name}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            listeners?.onKeyDown?.(e)
          }
        }}
      >
        <i className="pi pi-bars" aria-hidden="true"></i>
      </div>
      <h2 className="event-name">{event.name}</h2>
    </div>
  )

  const cardFooter = (
    <div className="event-card-footer">
      <Button
        label="Register"
        icon="pi pi-user-plus"
        onClick={() => onRegister(event.id)}
        className="register-button"
        aria-label={`Register for ${event.name}`}
      />
    </div>
  )

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`event-card-wrapper ${isDragging ? 'dragging-overlay' : ''} ${isActive ? 'active' : ''}`}
      role="listitem"
    >
      <Card
        header={cardHeader}
        footer={cardFooter}
        className="event-card"
      >
        <div className="event-details">
          <div className="event-info-item">
            <i className="pi pi-calendar" aria-hidden="true"></i>
            <span>
              <strong>Date:</strong> {formatDate(event.date)}
            </span>
          </div>
          <div className="event-info-item">
            <i className="pi pi-map-marker" aria-hidden="true"></i>
            <span>
              <strong>Location:</strong> {event.location}
            </span>
          </div>
          <div className="event-description">
            <p>{event.description}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EventCard

