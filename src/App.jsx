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

import ApplicantsList from './components/Applicants/ApplicantsList'

const App = () => {
  const [events, setEvents] = useState([])
  const [companyEvents, setCompanyEvents] = useState([])

  const [applications, setApplications] = useState([])
  const [applicants, setApplicants] = useState([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const handleAddEvent = async (formData) => {
    const newEvent = await eventService.create(formData)
    setEvents([...events, newEvent])
    navigate('/baadir/companyEvents')
  }

  const handleAddApplication = async (eventId) => {
    const newApplications = await applicationService.create(eventId)
    setApplications([...applications, newApplications])
    navigate('/baadir/applications')
  }

  const handleDeleteEvent = async (eventId) => {
    const deleteEvent = await eventService.deleteEvent(eventId)
    setEvents(events.filter((event) => event._id !== deleteEvent._id))
    navigate('/baadir/companyEvents')
  }

  const handleEditEvent = async (eventId, eventFormData)=>{
    const updatedEvent = await eventService.update(eventId, eventFormData)
    setEvents(events.map((event)=>(eventId === event._id ? updatedEvent : event)))
    navigate(`/baadir/events/${eventId}`)
  }

  const handleApplicantsList = async (eventId) => {
    const applicationsData = await applicationService.applicationIndex(eventId)
      setApplicants(applicationsData)
  }

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
            <Route path='/baadir/events' element={<EventList events={events}  handleAddApplication={handleAddApplication} />} />
            <Route path='/baadir/events/:eventId' element={<EventsDetails handleApplicantsList = {handleApplicantsList} handleDeleteEvent={handleDeleteEvent} />} />
            {user.role === "Company" ? (
              <>
                <Route path='/baadir/companyEvents' element={<CompanyEvents companyEvents={companyEvents} handleDeleteEvent={handleDeleteEvent}/>} />
                <Route path='/baadir/events/new' element={<EventsForm handleAddEvent={handleAddEvent} />} />
                <Route path='/baadir/events/:eventId/edit' element={<EventsForm handleEditEvent={handleEditEvent}/>} />
                <Route path='/baadir/events/:eventId/applications' element={<ApplicantsList applicants={applicants} />} />
              </>
            ) : (
              <>   
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