import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../services/mockApi'

const STORAGE_KEY = 'eventOrder'

// Load event order from localStorage
const loadEventOrder = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Error loading event order:', error)
    return null
  }
}

// Save event order to localStorage
const saveEventOrder = (order) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
  } catch (error) {
    console.error('Error saving event order:', error)
  }
}

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    const response = await mockApi.getEvents()
    return response.data
  }
)

// Async thunk to fetch single event
export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId) => {
    const response = await mockApi.getEventById(eventId)
    return response.data
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    customOrder: loadEventOrder(),
    loading: false,
    error: null,
    selectedEvent: null,
  },
  reducers: {
    reorderEvents: (state, action) => {
      state.customOrder = action.payload
      saveEventOrder(action.payload)
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { reorderEvents, clearSelectedEvent } = eventsSlice.actions

// Selector to get ordered events
export const selectOrderedEvents = (state) => {
  const { items, customOrder } = state.events
  
  if (!customOrder || customOrder.length === 0) {
    return items
  }
  
  // Sort events based on custom order
  const orderedEvents = [...items].sort((a, b) => {
    const indexA = customOrder.indexOf(a.id)
    const indexB = customOrder.indexOf(b.id)
    
    // If event is not in custom order, put it at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    
    return indexA - indexB
  })
  
  return orderedEvents
}

export default eventsSlice.reducer

