import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-brand">
              <i className="pi pi-ticket"></i>
              <span className="brand-text">Event Registration</span>
            </Link>

            <div className="navbar-menu">
              <Link
                to="/"
                className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
              >
                <i className="pi pi-calendar"></i>
                <span>Events</span>
              </Link>
              <Link
                to="/my-registrations"
                className={`navbar-item ${location.pathname === '/my-registrations' ? 'active' : ''}`}
              >
                <i className="pi pi-list"></i>
                <span>My Registrations</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Event Registration System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout

