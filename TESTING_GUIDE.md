# Testing Guide

This guide helps you test all features of the Event Registration System to ensure everything works correctly.

## 🧪 Manual Testing Checklist

### 1. Event List Page (/)

#### Display & Layout
- [ ] Page loads successfully
- [ ] All 6 events are displayed
- [ ] Each event card shows:
  - [ ] Event name
  - [ ] Date
  - [ ] Location
  - [ ] Description
  - [ ] Register button
  - [ ] Drag handle (bars icon)
- [ ] Page is responsive (test on different screen sizes)

#### Drag-and-Drop (Mouse/Touch)
- [ ] Click and drag an event card
- [ ] Visual feedback during drag (opacity change)
- [ ] Event stays in new position after drop
- [ ] Drag overlay appears during drag
- [ ] Smooth animations during reorder

#### Drag-and-Drop (Keyboard)
- [ ] Press Tab to navigate through page elements
- [ ] Focus reaches the drag handle
- [ ] Press Space or Enter on drag handle to "pick up"
- [ ] Use Arrow keys to move up/down
- [ ] Press Space or Enter to "drop"
- [ ] Focus indicator is visible

#### Persistence
- [ ] Reorder events using drag-and-drop
- [ ] Refresh the page (F5 or Ctrl+R)
- [ ] Custom order is maintained after refresh
- [ ] Open browser DevTools → Application → Local Storage
- [ ] Verify "eventOrder" key exists with array of IDs

#### Navigation
- [ ] Click "Register" button on any event
- [ ] Redirects to registration page for that event
- [ ] Click "My Registrations" in navigation
- [ ] Returns to home when clicking "Events" in navigation

### 2. Event Registration Page (/register/:eventId)

#### Display
- [ ] Event details are shown on the left (desktop) or top (mobile)
- [ ] Registration form is shown on the right (desktop) or bottom (mobile)
- [ ] "Back to Events" button is visible at top

#### Form Validation - Name Field
- [ ] Leave name empty and tab away
- [ ] Error message appears: "Name is required"
- [ ] Enter single character
- [ ] Error: "Name must be at least 2 characters"
- [ ] Enter valid name (2+ characters)
- [ ] Error disappears

#### Form Validation - Email Field
- [ ] Leave email empty and tab away
- [ ] Error: "Email is required"
- [ ] Enter "invalid-email"
- [ ] Error: "Please enter a valid email address"
- [ ] Enter "test@email"
- [ ] Error persists (missing domain extension)
- [ ] Enter "test@email.com"
- [ ] Error disappears

#### Form Validation - Phone Field
- [ ] Leave phone empty and tab away
- [ ] Error: "Phone number is required"
- [ ] Enter letters or special characters
- [ ] Error: "Please enter a valid phone number"
- [ ] Enter "123"
- [ ] Error: "Phone number must be at least 10 digits"
- [ ] Enter valid phone (e.g., "1234567890")
- [ ] Error disappears

#### Form Submission
- [ ] Try submitting empty form
- [ ] All three error messages appear
- [ ] Fill all fields correctly
- [ ] Click "Submit Registration"
- [ ] Button shows loading spinner and "Submitting..."
- [ ] Redirects to confirmation page

#### Responsive Design
- [ ] Test on mobile width (< 768px)
- [ ] Event info and form stack vertically
- [ ] Form is still usable and readable

### 3. Registration Confirmation Page (/confirmation/:eventId)

#### Display
- [ ] Success icon (green checkmark) is animated
- [ ] Success message is displayed
- [ ] "Registration Successful!" heading is shown
- [ ] Event details card shows:
  - [ ] Event name
  - [ ] Date
  - [ ] Location
  - [ ] Description
- [ ] Registration details card shows:
  - [ ] Your name
  - [ ] Your email
  - [ ] Your phone
  - [ ] Registration ID
  - [ ] Registration timestamp
- [ ] "What's Next?" section with 3 tips is visible

#### Navigation
- [ ] Click "Back to Events" button
- [ ] Returns to event list page
- [ ] Register for event again
- [ ] Complete registration
- [ ] On confirmation page, click "View My Registrations"
- [ ] Navigates to My Registrations page

#### Direct Access (Edge Case)
- [ ] Open new browser tab
- [ ] Navigate directly to `/confirmation/1`
- [ ] Should redirect to home (no registration in session)

### 4. My Registrations Page (/my-registrations)

#### Empty State
- [ ] Clear browser local storage (DevTools → Application → Local Storage → Clear)
- [ ] Navigate to My Registrations
- [ ] Empty state is displayed with:
  - [ ] Inbox icon
  - [ ] "No Registrations Yet" message
  - [ ] "Browse Events" button
- [ ] Click "Browse Events"
- [ ] Redirects to event list

#### With Registrations
- [ ] Register for 2-3 different events
- [ ] Navigate to My Registrations
- [ ] Summary card shows correct total count
- [ ] All registrations are displayed
- [ ] Each registration card shows:
  - [ ] Event badge with icon
  - [ ] Event name and registration ID
  - [ ] Complete event information
  - [ ] Complete registration details
  - [ ] Success status message

#### Multiple Registrations
- [ ] Register for the same event multiple times (with different details)
- [ ] All registrations appear in My Registrations
- [ ] Each has unique registration ID

### 5. Navigation & Routing

#### Header Navigation
- [ ] Click logo/title
- [ ] Returns to home page
- [ ] Navigate to different pages
- [ ] Active menu item is highlighted (light blue background)

#### Browser Navigation
- [ ] Use browser back button
- [ ] Previous page loads correctly
- [ ] Use browser forward button
- [ ] Next page loads correctly
- [ ] Refresh any page (F5)
- [ ] Page reloads correctly with state preserved

### 6. Responsive Design Testing

#### Mobile (< 480px)
- [ ] Open Chrome DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Select iPhone SE or similar
- [ ] Test all pages:
  - [ ] Event list: Single column, full width cards
  - [ ] Registration form: Stacked layout
  - [ ] Confirmation: Cards stack vertically
  - [ ] My Registrations: Single column
- [ ] Navigation menu works
- [ ] All buttons are tap-friendly

#### Tablet (768px)
- [ ] Select iPad or similar device
- [ ] Test all pages
- [ ] Layout adjusts appropriately
- [ ] Touch interactions work

#### Desktop (> 992px)
- [ ] View in full browser width
- [ ] Multi-column layouts display correctly
- [ ] Hover effects work
- [ ] All spacing is appropriate

### 7. Accessibility Testing

#### Keyboard Navigation
- [ ] Use only keyboard (unplug/disable mouse)
- [ ] Tab through entire application
- [ ] All interactive elements are reachable
- [ ] Focus indicators are visible
- [ ] Can submit forms with Enter key
- [ ] Can activate buttons with Space or Enter

#### Screen Reader (Optional)
- [ ] Enable Windows Narrator or macOS VoiceOver
- [ ] Navigate through pages
- [ ] ARIA labels are announced
- [ ] Form errors are announced
- [ ] Drag-and-drop state is announced

#### Focus Management
- [ ] Tab through event list
- [ ] Focus order is logical (top to bottom, left to right)
- [ ] No focus traps
- [ ] Skip link or easy navigation

#### Color Contrast
- [ ] Text is readable against backgrounds
- [ ] Error messages are clearly visible
- [ ] Focus indicators are prominent

### 8. Performance Testing

#### Load Times
- [ ] Clear cache (Ctrl+Shift+Delete)
- [ ] Reload page
- [ ] Page loads within 2-3 seconds
- [ ] Loading spinner appears briefly

#### Smooth Animations
- [ ] All animations are smooth (60fps)
- [ ] No janky scrolling
- [ ] Drag-and-drop is fluid
- [ ] Page transitions are smooth

#### Browser Memory
- [ ] Open Chrome Task Manager (Shift+Esc)
- [ ] Check memory usage
- [ ] Should be reasonable (< 100MB)
- [ ] Navigate through all pages
- [ ] No significant memory leaks

### 9. Data Persistence Testing

#### LocalStorage
- [ ] Register for an event
- [ ] Reorder events
- [ ] Close browser completely
- [ ] Reopen browser
- [ ] Navigate to application
- [ ] Registrations are still there
- [ ] Event order is preserved

#### Clear Data
- [ ] Open DevTools → Application → Local Storage
- [ ] Delete "registrations" key
- [ ] Refresh page
- [ ] My Registrations shows empty state
- [ ] Delete "eventOrder" key
- [ ] Refresh page
- [ ] Events return to default order

### 10. Error Handling

#### Network Simulation (Optional)
- [ ] Open DevTools → Network tab
- [ ] Throttle to "Slow 3G"
- [ ] Navigate through application
- [ ] Loading states appear correctly
- [ ] No crashes or errors

#### Invalid Routes
- [ ] Navigate to `/invalid-route`
- [ ] App handles gracefully (shows event list or 404)
- [ ] Navigate to `/register/999` (non-existent event)
- [ ] Shows "Event not found" message

## 📊 Test Results Template

```markdown
## Test Run: [Date]
**Tester**: [Your Name]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Device**: [Desktop/Mobile/Tablet]

### Results
- [ ] Event List: PASS / FAIL
- [ ] Drag-and-Drop (Mouse): PASS / FAIL
- [ ] Drag-and-Drop (Keyboard): PASS / FAIL
- [ ] Event Registration: PASS / FAIL
- [ ] Form Validation: PASS / FAIL
- [ ] Confirmation Page: PASS / FAIL
- [ ] My Registrations: PASS / FAIL
- [ ] Responsive Design: PASS / FAIL
- [ ] Accessibility: PASS / FAIL
- [ ] Performance: PASS / FAIL
- [ ] Data Persistence: PASS / FAIL

### Issues Found
1. [Describe issue]
2. [Describe issue]

### Notes
[Any additional observations]
```

## 🔧 Debugging Tips

### View Redux State
```javascript
// In browser console
window.__REDUX_DEVTOOLS_EXTENSION__
```
Install Redux DevTools extension to inspect state changes.

### View LocalStorage
```javascript
// In browser console
localStorage.getItem('eventOrder')
localStorage.getItem('registrations')
```

### Clear All Data
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### Check for Console Errors
- Open DevTools Console (F12)
- Look for red error messages
- Check for warnings (yellow)

## ✅ Success Criteria

All features should:
- ✅ Work correctly
- ✅ Be responsive
- ✅ Be accessible
- ✅ Have smooth animations
- ✅ Persist data correctly
- ✅ Handle errors gracefully
- ✅ Load quickly
- ✅ Work across browsers

## 🐛 Common Issues & Solutions

### Events don't load
- Check console for errors
- Verify mock API is working
- Check network tab for failed requests

### Drag-and-drop not working
- Ensure @dnd-kit packages are installed
- Check for JavaScript errors
- Try different browser

### Form validation not working
- Check console for errors
- Verify state updates correctly
- Test individual validation functions

### Data not persisting
- Check localStorage is enabled in browser
- Verify no private/incognito mode
- Check localStorage quota not exceeded

---

**Happy Testing! 🎉**

If you find any issues, they can be tracked and fixed systematically.

