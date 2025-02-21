import { Routes, Route, useNavigate } from 'react-router'
import { useContext, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import EventsForm from './components/EventsForm/EventsForm'
import Dashboard from './components/Dashboard/Dashboard'

import { UserContext } from './contexts/UserContext'
import * as eventService from './services/eventService';
import EventList from './components/EventList/EventList';



import * as eventsService from './services/eventServices'

const App = () => {
  const [events, setEvents] = useState([])
  const [addEvent, setAddEvent] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormDisplayed, setIsFormDisplayed] = useState(false)
  
  const navigate = useNavigate()

  const handleSelect = (event) => {
    setSelected(event)
    setIsForm(false)
  }

  const handleFormView = (event) => {
    setSelected(null)
    setIsFormDisplayed(true)
  }

  const handleSubmit = async (formData) => {
    try {
      const newEvent = await eventsService.create(formData)
      if (newEvent.err) {
        throw new Error(newEvent.err)
      }
      setEvents([newEvent, events])
    } catch (err) {
      console.log(err)
    }
  }



  const handleAddEvent = async (formData) => {
    const newEvent = await eventsService.create(formData)
    setAddEvent([...addEvent, newEvent])
    navigate('/')
  }
    const { user } = useContext(UserContext);
  
    useEffect(() => {
      const fetchAllEvents = async () => {
        const eventsData = await eventService.index();
        setEvents(eventsData);
        console.log(eventsData)
      };

      if (user) fetchAllEvents();
    }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>
          <Route path='/' element={user ? <Dashboard /> : <Landing />} />
          <Route path='/baadir/events/new' element={<EventsForm handleAddEvent={handleAddEvent}/>} />
            <Route path='/Baadir/events' element={<EventList events={events} />} />
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
