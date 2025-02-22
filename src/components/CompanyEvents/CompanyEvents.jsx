import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const CompanyEvents = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <main>
        <h1>Welcome Back, {user.name}</h1>

        
        <Link to="/baadir/events/new">
          <button>Add Event</button>
        </Link>

        <h4>Your Events</h4>
        <div>

          <ul >
            {props.companyEvents.map((event) => (
              <li key={event._id}>
                <h4>{event.name}</h4>
                <p>Description: {event.description}</p>
                <p>Event Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>Volunteer Needed: {event.volunteers}</p>
                <p>Open to: {event.applicationDeadLine}</p>
                <p>Created by: {event.userId?.name}</p>
                <Link key={event._id} to={`/baadir/events/${event._id}`}><button>View</button></Link>
                <Link to={`/baadir/companyEvents`}>
                <button onClick={() => props.handleDeleteEvent(event._id)}>Delete</button>
                </Link>
                
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default CompanyEvents;
