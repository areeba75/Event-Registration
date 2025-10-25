# Quick Reference Card

## 🚀 Essential Commands

```bash
# Install all dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Key Files Location

```
Configuration
├── package.json          → Dependencies & scripts
├── vite.config.js        → Build config
└── index.html            → Entry point

Application Entry
├── src/main.jsx          → App initialization
└── src/App.jsx           → Routes & main component

Pages (Routes)
├── src/pages/EventList.jsx                → Home page (/)
├── src/pages/EventRegistration.jsx        → Register (/register/:id)
├── src/pages/RegistrationConfirmation.jsx → Confirm (/confirmation/:id)
└── src/pages/MyRegistrations.jsx          → My Regs (/my-registrations)

State Management
├── src/store/store.js                     → Redux config
├── src/store/slices/eventsSlice.js        → Events state
└── src/store/slices/registrationsSlice.js → Registration state

API
└── src/services/mockApi.js                → Mock API (replace with real API)
```

## 🎯 Main Features

| Feature | Location | Key Tech |
|---------|----------|----------|
| Event List | `/` | @dnd-kit, Redux |
| Drag & Drop | EventList.jsx | @dnd-kit/sortable |
| Registration Form | `/register/:id` | PrimeReact, Validation |
| Confirmation | `/confirmation/:id` | React Router |
| My Registrations | `/my-registrations` | Redux, LocalStorage |

## ⌨️ Keyboard Shortcuts

### Drag-and-Drop
- `Tab` → Navigate to drag handle
- `Space/Enter` → Pick up item
- `↑/↓` → Move item
- `Space/Enter` → Drop item
- `Esc` → Cancel drag

### Form Navigation
- `Tab` → Next field
- `Shift+Tab` → Previous field
- `Enter` → Submit form

### Browser
- `F5` → Refresh page
- `F12` → Open DevTools
- `Ctrl+Shift+M` → Toggle device toolbar (responsive testing)

## 🎨 Customization Quick Guide

### Change Theme Colors
Find and replace in all CSS files:
```css
/* From */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* To your colors */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
```

### Add Event Data
Edit `src/services/mockApi.js`:
```javascript
const MOCK_EVENTS = [
  {
    id: 1,
    name: "Your Event",
    date: "2025-12-01",
    location: "City, State",
    description: "Description here"
  },
  // Add more events...
]
```

### Change Port
Edit `vite.config.js`:
```javascript
server: {
  port: 3001, // Change this
  open: true
}
```

## 🔍 Debugging Tools

### View Redux State
```javascript
// Browser console
window.__REDUX_DEVTOOLS_EXTENSION__
```
*Install Redux DevTools browser extension*

### View LocalStorage
```javascript
// Browser console
localStorage.getItem('eventOrder')
localStorage.getItem('registrations')
```

### Clear All Data
```javascript
// Browser console
localStorage.clear()
location.reload()
```

### Check Console Errors
```
F12 → Console tab → Look for red errors
```

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 480px | Single column, stacked |
| Small Tablet | 480-768px | Adjusted spacing |
| Tablet | 768-992px | 2 columns (some sections) |
| Desktop | > 992px | Multi-column, full features |

## 🧪 Quick Test Checklist

### Must Test
- [ ] Events load and display
- [ ] Drag and drop works
- [ ] Register for event
- [ ] Form validation works
- [ ] Confirmation shows
- [ ] My Registrations shows data
- [ ] Refresh preserves data
- [ ] Responsive on mobile

### Keyboard Test
- [ ] Tab navigation works
- [ ] Drag with keyboard works
- [ ] Form submits with Enter

### Edge Cases
- [ ] Empty state (no registrations)
- [ ] Invalid event ID
- [ ] Refresh on confirmation page

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Complete project documentation |
| SETUP.md | Quick setup instructions |
| ARCHITECTURE.md | Technical architecture details |
| TESTING_GUIDE.md | Comprehensive testing checklist |
| PROJECT_SUMMARY.md | Assignment completion summary |
| QUICK_REFERENCE.md | This file - quick reference |

## 🎓 Tech Stack Quick Reference

### Core
- **React 18.2.0** - UI framework
- **Vite 5.0.8** - Build tool

### State & Routing
- **Redux Toolkit 2.0.1** - State management
- **React Router 6.20.0** - Navigation

### UI & Interaction
- **PrimeReact 10.2.1** - Component library
- **@dnd-kit 6.1.0** - Drag-and-drop

### HTTP & Utils
- **Axios 1.6.2** - API calls

## 🔗 Component Relationships

```
App
 ├─ Layout (Wrapper for all pages)
 │   ├─ Header (Navigation)
 │   ├─ Main Content
 │   │   ├─ EventList → EventCard (multiple)
 │   │   ├─ EventRegistration
 │   │   ├─ RegistrationConfirmation
 │   │   └─ MyRegistrations
 │   └─ Footer
```

## 💾 Data Flow

```
User Action → Component → Redux Action → Store Update → Component Re-render
                                      ↓
                               LocalStorage (Persist)
```

## 🎯 Redux State Shape

```javascript
{
  events: {
    items: [...],           // All events
    customOrder: [...],     // User's order
    loading: bool,
    selectedEvent: {...}
  },
  registrations: {
    items: [...],           // All registrations
    loading: bool,
    lastRegistration: {...} // Latest registration
  }
}
```

## ⚡ Performance Tips

1. **Clear cache** if changes don't appear
2. **Check console** for errors first
3. **Use Redux DevTools** to inspect state
4. **Test in incognito** for clean slate
5. **Disable extensions** if issues occur

## 🐛 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Port in use | Change port in vite.config.js |
| Dependencies error | `npm cache clean --force && npm install` |
| Drag not working | Check @dnd-kit installed, try different browser |
| Data not saving | Check localStorage enabled, not in private mode |
| Events not loading | Check console errors, verify mockApi.js |

## 📞 Where to Look for Help

1. **Setup issues** → SETUP.md
2. **How it works** → ARCHITECTURE.md
3. **Testing** → TESTING_GUIDE.md
4. **Features** → README.md
5. **Quick help** → This file!

## ✅ Pre-Deployment Checklist

- [ ] `npm install` successful
- [ ] `npm run dev` works
- [ ] All pages load correctly
- [ ] Drag-and-drop works
- [ ] Forms validate properly
- [ ] Data persists after refresh
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Documentation reviewed

---

## 🎉 You're All Set!

Run `npm install` then `npm run dev` and start exploring!

**Most Important Commands:**
```bash
npm install    # Do this first!
npm run dev    # Do this second!
```

**Then open:** http://localhost:3000

---

*Keep this reference handy while working with the project!*

