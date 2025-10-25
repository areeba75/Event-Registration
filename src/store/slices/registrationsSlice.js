import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mockApi } from '../../services/mockApi'

const STORAGE_KEY = 'registrations'

// Load registrations from localStorage
const loadRegistrations = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading registrations:', error)
    return []
  }
}

// Save registrations to localStorage
const saveRegistrations = (registrations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations))
  } catch (error) {
    console.error('Error saving registrations:', error)
  }
}

// Async thunk to register for event
export const registerForEvent = createAsyncThunk(
  'registrations/registerForEvent',
  async ({ eventId, userData }) => {
    const response = await mockApi.registerForEvent(eventId, userData)
    return response.data
  }
)

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    items: loadRegistrations(),
    loading: false,
    error: null,
    lastRegistration: null,
  },
  reducers: {
    clearLastRegistration: (state) => {
      state.lastRegistration = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false
        state.items.push(action.payload)
        state.lastRegistration = action.payload
        saveRegistrations(state.items)
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { clearLastRegistration } = registrationsSlice.actions

export default registrationsSlice.reducer

