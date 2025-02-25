import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router';
import "../../css/Applications.css"

import arrowViewIcon from "../../images/arrowViewIcon.png";
const ApplicationsList = (props) => {
    const { user } = useContext(UserContext)

    return (
        <main className="main-container">
            <header>
                <h1>
                    Your Applications
                </h1>
                <p className="role">{user? (user.role) : null}</p>
            </header>


            <Link to="/baadir/events" className="back-button">
                <button className='go-to-events'>View All Events</button>
            </Link>

            {user.role === "Volunteer" ? (
                <>
                    {props.applications.length === 0 && props.events.length === 0 ? (
                        <h2 id="Empty">You dont have Applications!</h2>
                    ) : (
                        <ul className="applications-grid">
                            {props.applications.map((application) =>

                                props.events.map((event, index) =>
                                    application.eventId === event._id ? (
                                        <div key={index} className='container'>
                                            <div className='tag'></div>
                                            <li key={event._id} className='application-card'>
                                                <h4 className="event-title">{event.name}</h4>
                                                <p className="event-description">{event.description}</p>
                                                <Link to={`/baadir/events/${event._id}`} className='view-arrow-icon'>
                                                    <img src={arrowViewIcon} alt='arrow for view details' />
                                                </Link>
                                                <div className="event-container-remove">
                                                    <button
                                                        onClick={() => props.handleDeleteApplication(application._id)}
                                                        className='remove-application-button'
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </li>
                                        </div>
                                    ) : null
                                )
                            )}
                        </ul>
                    )}
                </>
            ) : (
                <h2>Companies cannot have an applications</h2>
            )}
        </main >
    );

};


export default ApplicationsList;