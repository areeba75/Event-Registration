import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import './EventCard.css'

const EventCard = ({ event, onRegister, isDragging, isActive, position, total }) => {
  const [isDragMode, setIsDragMode] = useState(false)
  
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isDragMode) {
        setIsDragMode(true)
        // Announce to screen readers
        const announcement = `Drag mode activated for ${event.name}. Use arrow keys to move, Space or Enter to drop, Escape to cancel.`
        const liveRegion = document.getElementById('drag-announcements')
        if (liveRegion) {
          liveRegion.textContent = announcement
        }
      }
      listeners?.onKeyDown?.(e)
    } else if (e.key === 'Escape' && isDragMode) {
      e.preventDefault()
      setIsDragMode(false)
      const announcement = `Drag mode cancelled for ${event.name}`
      const liveRegion = document.getElementById('drag-announcements')
      if (liveRegion) {
        liveRegion.textContent = announcement
      }
    }
  }

  const cardHeader = (
    <div className="event-card-header">
      <div 
        className={`drag-handle ${isDragMode ? 'drag-mode-active' : ''}`}
        {...attributes}
        {...listeners}
        role="button"
        aria-label={`Drag to reorder ${event.name}. Position ${position} of ${total}. Currently ${isDragMode ? 'in drag mode' : 'ready to drag'}`}
        aria-pressed={isDragMode}
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
      className={`event-card-wrapper ${isDragging ? 'dragging-overlay' : ''} ${isActive ? 'active' : ''} ${isDragMode ? 'drag-mode' : ''}`}
      role="listitem"
      aria-label={`Event: ${event.name}, Date: ${formatDate(event.date)}, Location: ${event.location}, Position ${position} of ${total}`}
      aria-describedby={`event-${event.id}-description`}
      aria-posinset={position}
      aria-setsize={total}
      tabIndex={0}
      onFocus={() => {
        const announcement = `Focused on ${event.name} event. Press Tab to move to drag handle, or Shift+Tab to go back.`
        const liveRegion = document.getElementById('focus-announcements')
        if (liveRegion) {
          liveRegion.textContent = announcement
        }
      }}
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
          <div className="event-description" id={`event-${event.id}-description`}>
            <p>{event.description}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EventCard

