import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import "../../css/CompanyEvents.css"
const CompanyEvents = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
       <main className="company-events-container">
      <header>
        <h1>
          Welcome Back, <span className="highlight">{user? user.name : null}!</span>
        </h1>
        <p className="role">{user.role}</p>
      </header>


      <div className="add-event">
        <Link to="/baadir/events/new" className="add-event-button">
          <button className="plus-button">+</button>
          <span>Add New Event</span>
        </Link>
      </div>

      <h4>Your Events</h4>
      <div className="events-grid">
        {props.companyEvents.map((event) => (
          <div key={event._id} className="event-card">
            <h4 className="event-title">{event.name}</h4>
            <p className="event-description">{event.description}</p>
            
            <div className="event-actions">
              <Link to={`/baadir/events/${event._id}`} className="view-button">View</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
    
    </>
  );
};

export default CompanyEvents;
