import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { fetchEvents, reorderEvents, selectOrderedEvents } from '../store/slices/eventsSlice'
import EventCard from '../components/EventCard'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Message } from 'primereact/message'
import './EventList.css'

const EventList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const events = useSelector(selectOrderedEvents)
  const { loading, error } = useSelector((state) => state.events)
  const [activeId, setActiveId] = React.useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = events.findIndex((event) => event.id === active.id)
    const newIndex = events.findIndex((event) => event.id === over.id)

    const newOrder = arrayMove(events, oldIndex, newIndex)
    const newOrderIds = newOrder.map(event => event.id)
    
    dispatch(reorderEvents(newOrderIds))
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const handleRegister = (eventId) => {
    navigate(`/register/${eventId}`)
  }

  if (loading) {
    return (
      <div className="loading-container">
        <ProgressSpinner />
        <p>Loading events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <Message severity="error" text={`Error: ${error}`} />
      </div>
    )
  }

  const activeEvent = events.find((event) => event.id === activeId)

  return (
    <div className="event-list-page">
      {/* Screen reader announcements */}
      <div 
        id="drag-announcements" 
        aria-live="assertive" 
        aria-atomic="true"
        className="sr-only"
      ></div>
      <div 
        id="focus-announcements" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      ></div>
      
      <div className="page-header">
        <h1>Upcoming Events</h1>
        <p className="page-description">
          Browse and register for exciting events. You can drag and drop to reorder the list!
        </p>
        <div id="drag-instructions" className="drag-instructions" role="status" aria-live="polite">
          <i className="pi pi-info-circle"></i>
          <span>Tip: Click and drag events to reorder them, or use Tab + Space/Enter for keyboard navigation</span>
        </div>
      </div>

      {events.length === 0 ? (
        <Message severity="info" text="No events available at the moment." />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={events.map(e => e.id)}
            strategy={verticalListSortingStrategy}
          >
            <div 
              className="events-grid"
              role="list"
              aria-label="Event list with drag and drop reordering"
              aria-describedby="drag-instructions"
            >
              {events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  isActive={event.id === activeId}
                  position={index + 1}
                  total={events.length}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeEvent ? (
              <EventCard
                event={activeEvent}
                onRegister={handleRegister}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  )
}

export default EventList

