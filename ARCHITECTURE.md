# Application Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Event Registration System                │
│                    (Single Page Application)                 │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
    ┌───▼───┐           ┌─────▼─────┐       ┌─────▼─────┐
    │ React │           │   Redux   │       │  React    │
    │ View  │◄──────────┤  Toolkit  │       │  Router   │
    │ Layer │           │   Store   │       │   (Nav)   │
    └───┬───┘           └─────┬─────┘       └───────────┘
        │                     │
        │               ┌─────▼─────┐
        └───────────────┤ Services  │
                        │ (Mock API)│
                        └─────┬─────┘
                              │
                        ┌─────▼─────┐
                        │ LocalStorage │
                        │ (Persistence)│
                        └───────────┘
```

## 📦 Component Hierarchy

```
App (Root)
│
├── Layout (Header, Footer, Navigation)
│   │
│   ├── Routes
│   │   │
│   │   ├── EventList (/)
│   │   │   └── EventCard (multiple, draggable)
│   │   │       ├── Drag Handle
│   │   │       ├── Event Details
│   │   │       └── Register Button
│   │   │
│   │   ├── EventRegistration (/register/:eventId)
│   │   │   ├── Event Info Card
│   │   │   └── Registration Form
│   │   │       ├── Name Input (validated)
│   │   │       ├── Email Input (validated)
│   │   │       ├── Phone Input (validated)
│   │   │       └── Submit Button
│   │   │
│   │   ├── RegistrationConfirmation (/confirmation/:eventId)
│   │   │   ├── Success Icon
│   │   │   ├── Event Details Card
│   │   │   ├── Registration Details Card
│   │   │   └── Action Buttons
│   │   │
│   │   └── MyRegistrations (/my-registrations)
│   │       ├── Summary Card
│   │       └── Registration Cards (multiple)
│   │           ├── Event Badge
│   │           ├── Event Info
│   │           └── User Details
```

## 🔄 Data Flow

### Event List & Reordering
```
User Action (Drag/Drop)
        │
        ▼
DND Context (Event Handler)
        │
        ▼
Redux Action (reorderEvents)
        │
        ├──► Redux Store (Update customOrder)
        │
        └──► LocalStorage (Persist order)
        │
        ▼
Component Re-render (New order)
```

### Registration Flow
```
User fills form
        │
        ▼
Form Validation (Real-time)
        │
        ▼
Submit Form
        │
        ▼
Redux Thunk (registerForEvent)
        │
        ├──► Mock API Call (simulate network)
        │
        └──► Redux Store (Add registration)
        │
        ├──► LocalStorage (Persist)
        │
        └──► Navigate to Confirmation
```

### Page Load Flow
```
App Mount
    │
    ├──► Redux Thunk (fetchEvents)
    │    │
    │    └──► Mock API
    │         │
    │         └──► Redux Store (events)
    │
    └──► Load from LocalStorage
         │
         ├──► Event Order
         │
         └──► Registrations
```

## 🗄️ State Management

### Redux Store Structure
```javascript
{
  events: {
    items: [              // Array of event objects
      {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-11-15",
        location: "San Francisco, CA",
        description: "..."
      },
      // ... more events
    ],
    customOrder: [1, 3, 2, 5, 4, 6],  // User's custom order
    loading: false,
    error: null,
    selectedEvent: null   // Currently viewing event
  },
  
  registrations: {
    items: [              // Array of registration objects
      {
        registrationId: 1730123456789,
        eventId: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        registeredAt: "2025-10-24T10:30:00Z"
      },
      // ... more registrations
    ],
    loading: false,
    error: null,
    lastRegistration: {...}  // Most recent registration
  }
}
```

### LocalStorage Schema
```javascript
{
  "eventOrder": [1, 3, 2, 5, 4, 6],  // Custom event order
  "registrations": [                  // All user registrations
    {
      registrationId: 1730123456789,
      eventId: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      registeredAt: "2025-10-24T10:30:00Z"
    }
  ]
}
```

## 🎨 Styling Architecture

```
Global Styles (index.css)
    │
    ├── PrimeReact Theme (Lara Light Blue)
    │
    └── Component Styles
        │
        ├── Layout.css (Header, Footer, Navigation)
        │
        ├── EventCard.css (Card, Drag handle, Animations)
        │
        └── Page Styles
            ├── EventList.css
            ├── EventRegistration.css
            ├── RegistrationConfirmation.css
            └── MyRegistrations.css
```

### CSS Patterns Used
- **Gradients**: Purple/Blue gradient theme
- **Flexbox**: Flexible layouts
- **Grid**: Responsive card layouts
- **Animations**: Fade-in, slide-up, scale effects
- **Transitions**: Smooth hover/focus states
- **Media Queries**: Responsive breakpoints

## 🔌 API Integration Points

### Current (Mock API)
```javascript
mockApi.getEvents()
    → Returns array of events after 500ms delay

mockApi.getEventById(id)
    → Returns single event after 300ms delay

mockApi.registerForEvent(eventId, userData)
    → Returns registration object after 500ms delay
```

### Future (Real API)
```javascript
// Replace in src/services/api.js
axios.get('/api/events')
axios.get('/api/events/:id')
axios.post('/api/events/:id/register', userData)
```

## ♿ Accessibility Features

```
Keyboard Navigation
    │
    ├── Tab Navigation (Focus management)
    │
    ├── Drag-and-Drop
    │   ├── Space/Enter to pick up
    │   ├── Arrow keys to move
    │   └── Space/Enter to drop
    │
    └── Form Navigation
        └── Tab through inputs

ARIA Attributes
    │
    ├── aria-label (Descriptive labels)
    ├── aria-invalid (Form validation)
    ├── aria-describedby (Error messages)
    ├── aria-required (Required fields)
    └── role="alert" (Error announcements)

Semantic HTML
    │
    ├── <header>, <main>, <footer>
    ├── <nav> (Navigation)
    ├── <h1>, <h2>, <h3> (Proper hierarchy)
    └── <button>, <form>, <label>
```

## 🎯 Drag-and-Drop Architecture

```
┌────────────────────────────────────────┐
│         DndContext Provider            │
│  (Manages drag-and-drop state)        │
└────────────────┬───────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼───────┐        ┌───────▼────┐
│ Sensors   │        │ Collision  │
│           │        │ Detection  │
├───────────┤        └────────────┘
│ Pointer   │
│ Keyboard  │
└───────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼──────────┐     ┌───────▼─────┐
│ SortableContext│   │ DragOverlay │
│ (Event Cards) │     │ (Visual)    │
└───────────────┘     └─────────────┘
```

### Drag Flow
1. **DragStart**: Store activeId, show overlay
2. **DragMove**: Update visual position
3. **DragEnd**: Calculate new order, update Redux
4. **DragCancel**: Reset to original position

## 📱 Responsive Breakpoints

```
Mobile First Design
    │
    ├── Base: < 480px (Mobile)
    │   └── Single column, full width
    │
    ├── Small: 480px - 768px (Tablet)
    │   └── Adjusted spacing, larger text
    │
    ├── Medium: 768px - 992px (Tablet Landscape)
    │   └── 2-column grid for some sections
    │
    └── Large: > 992px (Desktop)
        └── Multi-column, optimal spacing
```

## 🚀 Performance Considerations

### Optimization Strategies
- **Code Splitting**: Route-based (can add React.lazy)
- **Redux Selectors**: Memoized with Reselect (selectOrderedEvents)
- **LocalStorage**: Debounced writes (try-catch error handling)
- **Event Handlers**: Optimized with useCallback (where needed)
- **Animations**: CSS transitions (GPU accelerated)

### Bundle Size Optimization
```
React + ReactDOM      : ~150 KB
Redux Toolkit         : ~50 KB
React Router          : ~30 KB
PrimeReact           : ~200 KB (tree-shakeable)
@dnd-kit             : ~30 KB
Axios                : ~15 KB
────────────────────────────────
Estimated Total      : ~475 KB (gzipped: ~150 KB)
```

## 🔐 Data Validation

### Client-Side Validation
```
Form Field → onChange/onBlur
    │
    ├── Name: Min 2 characters, required
    │
    ├── Email: Valid email format, required
    │
    └── Phone: Valid format, min 10 digits, required
    
Validation → Error State
    │
    └── Display error message (ARIA announce)
```

## 📈 Scalability Considerations

### Ready for Scale
- Component-based architecture (reusable)
- Centralized state management
- Separation of concerns
- Mock API easy to replace

### Future Enhancements
- Authentication/Authorization
- Backend integration
- Database storage
- Email notifications
- Advanced filtering/search
- Pagination for large datasets
- Real-time updates (WebSocket)

---

**This architecture provides a solid foundation for a modern, accessible, and maintainable event registration system.**

