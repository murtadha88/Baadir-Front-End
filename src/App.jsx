import { Routes, Route } from 'react-router'
import { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import Landing from './components/Landing/Landing'
import SignInForm from './components/SignInForm/SignInForm'
import Dashboard from './components/Dashboard/Dashboard'

import { UserContext } from './contexts/UserContext'
import * as eventService from './services/eventService';
import EventList from './components/EventList/EventList';



const App = () => {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState([]);
  
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
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
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
