# Quick Setup Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Redux Toolkit & React Redux
- React Router DOM
- PrimeReact & PrimeIcons
- @dnd-kit (drag-and-drop)
- Axios
- Vite

### Step 2: Start Development Server
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

### Step 3: Explore the Application

1. **Event List Page** (Home)
   - View all available events
   - Try dragging and dropping events to reorder them
   - Use keyboard (Tab + Space/Enter) for accessibility
   - Click "Register" on any event

2. **Registration Form**
   - Fill in your name, email, and phone number
   - See real-time validation
   - Submit to register

3. **Confirmation Page**
   - View your registration details
   - Navigate to "My Registrations" or back to events

4. **My Registrations**
   - See all your registered events
   - View complete details for each registration

## 🎯 Key Features to Test

### Drag-and-Drop
- **Mouse**: Click and drag event cards
- **Keyboard**: 
  1. Tab to an event card
  2. Tab again to the drag handle (bars icon)
  3. Press Space or Enter to pick up
  4. Arrow keys to move
  5. Space or Enter to drop
- **Persistence**: Refresh the page - your custom order is saved!

### Form Validation
- Try submitting empty fields
- Enter invalid email format
- Enter short phone number
- See instant validation feedback

### Responsive Design
- Resize your browser window
- Test on mobile device
- All features work on any screen size

## 📦 Project Structure Overview

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (routes)
├── store/           # Redux store and slices
├── services/        # API services (currently mock)
└── main.jsx         # Application entry point
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 💡 Tips

1. **Data Persistence**: All registrations and event order are saved to browser localStorage
2. **Mock API**: The app uses a mock API with simulated delays for realistic feel
3. **Accessibility**: Full keyboard navigation support throughout
4. **Responsive**: Optimized for mobile, tablet, and desktop

## 🐛 Troubleshooting

### Port already in use?
Edit `vite.config.js` and change the port:
```javascript
server: {
  port: 3001, // Change to any available port
  open: true
}
```

### Dependencies not installing?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Need to clear saved data?
Open browser DevTools → Application → Local Storage → Clear all

## 📝 What's Implemented

✅ Event list with drag-and-drop reordering  
✅ Keyboard navigation and ARIA support  
✅ Persistent custom ordering (localStorage)  
✅ Event registration form with validation  
✅ Registration confirmation page  
✅ My Registrations page  
✅ Redux Toolkit state management  
✅ React Router navigation  
✅ PrimeReact UI components  
✅ Responsive design  
✅ Smooth animations and transitions  
✅ Mock API with Axios  

## 🎨 Customization

Want to customize the app?

1. **Colors**: Edit CSS files in `src/components/` and `src/pages/`
2. **Events Data**: Modify `src/services/mockApi.js`
3. **Add Fields**: Update forms in `src/pages/EventRegistration.jsx`
4. **Styling**: All styles are in `.css` files next to components

## 🚀 Ready to Use

The application is production-ready with:
- Modern React patterns (hooks, functional components)
- Centralized state management
- Proper error handling
- Loading states
- Accessibility features
- Responsive design

---

**Need Help?** Check the full README.md for detailed documentation!

