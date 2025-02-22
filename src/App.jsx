import { Routes, Route, useNavigate } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Home from './components/Home/Home'
import SignInForm from './components/SignInForm/SignInForm'
import EventsForm from './components/EventsForm/EventsForm'
import CompanyEvents from './components/CompanyEvents/CompanyEvents'
import EventsDetails from './components/EventDetails/EventDetails'

import { UserContext } from './contexts/UserContext'

import * as eventService from './services/eventService';
import EventList from './components/EventList/EventList';

import * as applicationService from './services/applicationService';
import ApplicationsList from './components/Applications/ApplicationsList'

const App = () => {
  const [events, setEvents] = useState([])
  const [companyEvents, setCompanyEvents] = useState([])

  const [applications, setApplications] = useState([])

  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const handleAddEvent = async (formData) => {
    const newEvent = await eventService.create(formData)
    setEvents([...events, newEvent])
    navigate('/baadir/companyEvents')
  }

  // const handleDeleteEvent = async (id) => {
  //   console.log('userId', id)
  //   const deleteEvent = await eventService.deleteEvent(id)
  //   setEvents(events.filter((event) => event._id !== deleteEvent._id))
  //   navigate('/baadir/events')
  // }


  useEffect(() => {
    if (!user) return

    const fetchAllEvents = async () => {
      const eventsData = await eventService.index()
      setEvents(eventsData)
    }
    fetchAllEvents()

    if (user.role !== "Company") {
      const fetchAllApplications = async () => {
        const applicationsData = await applicationService.index()
        setApplications(applicationsData)
      }
      fetchAllApplications()
    }

    if (user.role === "Company") {
      const fetchAllCompanyEvents = async () => {
        const eventsData = await eventService.companyIndex()
        setCompanyEvents(eventsData)
      }
      fetchAllCompanyEvents()
    }
  }, [user])


  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/baadir/events' element={<EventList events={events} />} />
            {user.role === "Company" ? (
              <>
                <Route path='/baadir/companyEvents' element={<CompanyEvents companyEvents={companyEvents} />} />
                <Route path='/baadir/events/new' element={<EventsForm handleAddEvent={handleAddEvent} />} />
              </>
            ) : (
              <>
                <Route path='/baadir/events/view' element={<EventsDetails events={events} />} />
                <Route path='/baadir/applications' element={<ApplicationsList applications={applications} events={events} />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  )
}
export default App