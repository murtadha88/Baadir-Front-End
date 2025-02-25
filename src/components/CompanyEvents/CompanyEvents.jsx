import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import "../../css/CompanyEvents.css"
import "../../css/main.css"
const CompanyEvents = (props) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <main className="main-container">
        <header>
          <h1>
            Welcome to Baadir, <span className="highlight">{user ? user.name : null}!</span>
          </h1>
          <p className="role">{user? (user.role) : null}</p>
        </header>


        <div className="add-event">
          <Link to="/baadir/events/new" className="add-event-button">
            <button className="plus-button">
              +
            </button>
          </Link>

          <span>Add New Event</span>
        </div>

        <h4>Your Events</h4>
        <div className="events-grid">
          {props.companyEvents.length === 0 ? (
            <h2 id="Empty">You dont have Events!</h2>
          ) : (
            props.companyEvents.map((event) => (
              <div className='container' key={event._id}>
                <div className='tag'></div>
                <div key={event._id} className="event-card">
                  <h4 className="event-title">{event.name}</h4>
                  <p className="event-description">{event.description}</p>

                  <div className="event-actions">
                    <Link to={`/baadir/events/${event._id}`} className="view-button">View</Link>
                  </div>
                </div>
              </div>
            )))}
        </div>
      </main>


    </>
  );
};

export default CompanyEvents;
