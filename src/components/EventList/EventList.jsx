import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router'
import "../../css/EventList.css"
import "../../css/main.css"
const EventList = (props) => {
    const { user } = useContext(UserContext)

    const handleApplication = (eventId) => {
        props.handleAddApplication(eventId)
    }

    return (
        <main className="main-container">

            <header>
                <h1>
                    Welcome to Baadir, <span className="highlight">{user ? user.name : null}!</span>
                </h1>
                <p className="role">{user? (user.role) : null}</p>
            </header>
            <h4 className='events-title'>Events</h4>
            <ul className="events-grid">
                {props.events.length === 0 ? (
                    <h2 id="Empty">There is no Events</h2>
                ) : (
                    props.events.map((event) => (
                        <div className='container' key={event._id}>
                            <div className='tag'></div>
                            <li key={event._id} className='event-card'>
                                <h4 className="event-title">{event.name}</h4>

                                <p className="event-description">{event.description}</p>
                                <div className='buttons-container'>
                                    <div className="event-actions">
                                        <Link to={`/baadir/events/${event._id}`} className="view-button">View</Link>
                                    </div>
                                    <div className="event-container">
                                        {user.role !== "Company" ? (
                                            <button onClick={() => handleApplication(event._id)} className='apply-button'>Apply</button>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            </li>
                        </div>
                    )))}
            </ul>
        </main>
    );

};


export default EventList;