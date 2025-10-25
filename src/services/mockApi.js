// Mock API service for events
const MOCK_EVENTS = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-11-15",
    location: "San Francisco, CA",
    description: "Annual technology conference featuring the latest innovations in AI, Web Development, and Cloud Computing."
  },
  {
    id: 2,
    name: "React Summit",
    date: "2025-12-01",
    location: "New York, NY",
    description: "The biggest React conference of the year with workshops and talks from industry leaders."
  },
  {
    id: 3,
    name: "DevOps World",
    date: "2025-11-20",
    location: "Austin, TX",
    description: "Learn about the latest DevOps practices, CI/CD pipelines, and infrastructure automation."
  },
  {
    id: 4,
    name: "Design Systems Meetup",
    date: "2025-11-28",
    location: "Seattle, WA",
    description: "A gathering of designers and developers to discuss design systems and component libraries."
  },
  {
    id: 5,
    name: "JavaScript Nation",
    date: "2025-12-10",
    location: "Boston, MA",
    description: "Explore the JavaScript ecosystem, from Node.js to modern frameworks and tooling."
  },
  {
    id: 6,
    name: "Cloud Computing Expo",
    date: "2025-12-15",
    location: "Los Angeles, CA",
    description: "Discover cloud platforms, serverless architecture, and scalable solutions for modern applications."
  }
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  // Fetch all events
  async getEvents() {
    await delay(500)
    return { data: MOCK_EVENTS }
  },

  // Fetch single event by ID
  async getEventById(id) {
    await delay(300)
    const event = MOCK_EVENTS.find(e => e.id === parseInt(id))
    if (!event) {
      throw new Error('Event not found')
    }
    return { data: event }
  },

  // Register for an event
  async registerForEvent(eventId, userData) {
    await delay(500)
    return {
      data: {
        registrationId: Date.now(),
        eventId: parseInt(eventId),
        ...userData,
        registeredAt: new Date().toISOString()
      }
    }
  }
}

