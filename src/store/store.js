import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from './slices/eventsSlice'
import registrationsReducer from './slices/registrationsSlice'

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

