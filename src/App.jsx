import { Routes, Route, useNavigate } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import EventsForm from './components/EventsForm/EventsForm'
import Dashboard from './components/Dashboard/Dashboard'
import EventsDetails from './components/EventDetails/EventDetails'

import { UserContext } from './contexts/UserContext'

import * as eventService from './services/eventService';
import EventList from './components/EventList/EventList';

import * as applicationService from './services/applicationService';
import ApplicationsList from './components/Applications/ApplicationsList'

const App = () => {
  const [events, setEvents] = useState([])
  const [companyEvents, setCompanyEvents] = useState([])
  const [addEvent, setAddEvent] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)

  const [applications, setApplications] = useState([])

  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const handleSelect = (event) => {
    setSelected(event)
    setIsFormDisplayed(false)
  }
  const handleFormView = (event) => {
    setSelected(null)
    setIsFormDisplayed(true)
  }
  const handleSubmit = async (formData) => {
    try {
      const newEvent = await eventService.create(formData)
      if (newEvent.err) {
        throw new Error(newEvent.err)
      }
      setEvents([newEvent, ...events])
    } catch (err) {
      console.log(err)
    }
  }
  const handleAddEvent = async (formData) => {
    const newEvent = await eventService.create(formData)
    setEvents([...events, newEvent])
    navigate('/')
  }

  // const handleDeleteEvent = async (id) => {
  //   console.log('userId', id)
  //   const deleteEvent = await eventService.deleteEvent(id)
  //   setEvents(events.filter((event) => event._id !== deleteEvent._id))
  //   navigate('/baadir/events')
  // }


  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
      setEvents(eventsData);
    };
    if (user) fetchAllEvents();

    const fetchAllApplications = async () => {
      const applicationsData = await applicationService.index();
      setApplications(applicationsData);
    };

    if (user) fetchAllApplications();

    const fetchAllCompanyEvents = async () => {
      const eventsData = await eventService.companyIndex();
      setCompanyEvents(eventsData);
      console.log(eventsData)
    };
    if (user) fetchAllCompanyEvents();

  }, [user]);
  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>

            <Route path='/' element={user.role === "Company" ? <Dashboard companyEvents={companyEvents} /> : <EventList events={events} />} />
            <Route path='/baadir/events/new' element={<EventsForm handleAddEvent={handleAddEvent} />} />
            <Route path='/baadir/events' element={<EventList events={events} />} />
            {/* <Route path='/baadir/events/view' element={<EventsDetails handleDeleteEvent={handleDeleteEvent} />} /> */}
            <Route path='/baadir/events/view' element={<EventsDetails events={events} />} />
            <Route path='/baadir/applications' element={<ApplicationsList applications={applications} events={events} />} />

          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  )
}
export default App