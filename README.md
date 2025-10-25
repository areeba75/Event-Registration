# Event Registration System

A modern, responsive web application for event registration built with React.js, Redux Toolkit, and PrimeReact. Features an intuitive drag-and-drop interface for organizing events with full accessibility support.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.1-purple)
![PrimeReact](https://img.shields.io/badge/PrimeReact-10.2.1-brightgreen)

## ✨ Features

### 📅 Event List Page
- Display events fetched from a mock API
- **Drag-and-drop reordering** with smooth animations
- Keyboard navigation support (Tab + Space/Enter)
- ARIA attributes for screen reader accessibility
- Persistent ordering across sessions using localStorage
- Responsive grid layout

### 📝 Event Registration Page
- Interactive registration form with real-time validation
- Collects user information: name, email, phone number
- Client-side validation with helpful error messages
- Side-by-side layout showing event details and form
- Loading states and error handling

### ✅ Registration Confirmation Page
- Beautiful success confirmation with animated check icon
- Displays complete event and registration details
- Shows unique registration ID and timestamp
- Quick navigation to view all registrations or browse more events
- "What's Next?" section with helpful instructions

### 📋 My Registrations Page
- View all registered events in one place
- Registration summary card showing total count
- Detailed cards for each registration with event info
- Easy navigation back to event browsing

### 🎨 UI/UX Highlights
- Modern gradient designs with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Accessible with keyboard navigation and ARIA labels
- PrimeReact components for consistent, polished UI
- Loading states and error handling throughout

## 🛠️ Technical Stack

- **React.js 18** - Modern UI framework
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **PrimeReact** - UI component library
- **@dnd-kit** - Accessible drag-and-drop functionality
- **Axios** - HTTP client (ready for real API integration)
- **Vite** - Fast build tool and dev server

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or download the project**
   ```bash
   cd "d:\Projects\Test Proj"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   The application will automatically open at `http://localhost:3000`

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
event-registration-system/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Layout.jsx       # Main layout with header/footer
│   │   ├── Layout.css
│   │   ├── EventCard.jsx    # Draggable event card
│   │   └── EventCard.css
│   ├── pages/               # Page components
│   │   ├── EventList.jsx    # Main events page with drag-drop
│   │   ├── EventList.css
│   │   ├── EventRegistration.jsx
│   │   ├── EventRegistration.css
│   │   ├── RegistrationConfirmation.jsx
│   │   ├── RegistrationConfirmation.css
│   │   ├── MyRegistrations.jsx
│   │   └── MyRegistrations.css
│   ├── store/               # Redux store
│   │   ├── store.js         # Store configuration
│   │   └── slices/
│   │       ├── eventsSlice.js        # Events state & logic
│   │       └── registrationsSlice.js # Registrations state
│   ├── services/            # API services
│   │   └── mockApi.js       # Mock API implementation
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Features Implementation

### Drag-and-Drop with Accessibility

The application uses `@dnd-kit` library which provides:
- **Mouse/Touch Support**: Click and drag with pointer devices
- **Keyboard Support**: Use Tab to navigate, Space/Enter to pick up and drop items
- **Screen Reader Support**: ARIA attributes announce drag operations
- **Smooth Animations**: CSS transitions for visual feedback
- **Persistent State**: Custom order saved to localStorage

### State Management Architecture

- **Redux Toolkit** for centralized state management
- **Async Thunks** for API operations
- **Selectors** for computed state (e.g., ordered events)
- **localStorage Integration** for persistence

### Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 992px
- Flexible grid layouts
- Touch-friendly interactive elements

## 🔄 Data Flow

1. **Events Loading**: App loads → Redux dispatches `fetchEvents()` → Events stored in state
2. **Drag-and-Drop**: User reorders → New order saved to Redux → Persisted to localStorage
3. **Registration**: Form submit → Redux dispatches `registerForEvent()` → Saved to localStorage → Navigate to confirmation
4. **Persistence**: All user data (order, registrations) survives page refresh

## 🌐 API Integration

Currently uses mock API (`src/services/mockApi.js`). To integrate with real backend:

1. Replace mock functions in `mockApi.js` with Axios calls
2. Update API endpoints
3. No changes needed in components (using Redux Toolkit)

Example:
```javascript
// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'https://your-api.com'

export const api = {
  async getEvents() {
    return await axios.get(`${API_BASE_URL}/events`)
  },
  async registerForEvent(eventId, userData) {
    return await axios.post(`${API_BASE_URL}/events/${eventId}/register`, userData)
  }
}
```

## 🎨 Customization

### Changing Theme Colors

Edit the gradient colors in CSS files:
```css
/* Current: Purple/Blue gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to your brand colors */
background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
```

### Adding More Fields to Registration

1. Update `formData` state in `EventRegistration.jsx`
2. Add validation in `validateField()` function
3. Add input fields in the form
4. Update Redux state if needed

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for drag-and-drop
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus Management**: Clear focus indicators
- **Error Announcements**: Form errors announced to screen readers
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

**Issue**: Dependencies not installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port 3000 already in use
- Change port in `vite.config.js`: `server: { port: 3001 }`

**Issue**: Drag-and-drop not working on touch devices
- Ensure you're using the latest version of @dnd-kit packages
- Test on actual devices (not just browser dev tools)

## 📝 Future Enhancements

- [ ] Event search and filtering
- [ ] Event categories/tags
- [ ] Calendar view
- [ ] Email notifications
- [ ] User authentication
- [ ] Event cancellation
- [ ] Social sharing
- [ ] Export registration details (PDF)
- [ ] Multi-language support
- [ ] Dark mode

## 👨‍💻 Development Notes

### Code Quality
- Uses React hooks (useState, useEffect, useSelector, useDispatch)
- Follows component composition patterns
- Implements proper error boundaries
- Uses PropTypes or TypeScript for type safety (upgrade path available)

### Performance
- Lazy loading ready (add React.lazy for route-based splitting)
- Memoization opportunities with React.memo and useMemo
- Optimized Redux selectors

## 📄 License

This project is created for evaluation purposes.

## 🤝 Contributing

This is an assignment project. For production use, consider:
- Adding unit tests (Jest, React Testing Library)
- E2E tests (Cypress, Playwright)
- CI/CD pipeline
- Environment variables for configuration
- API error handling improvements
- Form validation library (Formik, React Hook Form)

---

**Built with ❤️ using React.js and modern web technologies**

