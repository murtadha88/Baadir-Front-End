import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const CompanyEvents = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <main>
        <h1>Welcome Back, {user? user.name : null}</h1>


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
                <p>Event Date: {" "}
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p>Location: {event.location}</p>
                <p>Volunteer Needed: {event.volunteers}</p>
                <p>Open to: {" "}
                  {new Date(event.applicationDeadLine).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
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
