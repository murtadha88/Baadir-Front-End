import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router'

const EventList = (props) => {
    const { user } = useContext(UserContext)

    const handleApplication = (eventId) => {
        props.handleAddApplication(eventId)
    }

    return (
        <main>
            <ul>
                {props.events.map((event) => (
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
                        {user.role !== "Company" ? (
                            <button onClick={() => handleApplication(event._id)}>Apply</button>
                        ) : (
                            null
                        )}
                        <Link key={event._id} to={`/baadir/events/${event._id}`}><button>View</button></Link>
                    </li>
                ))}
            </ul>
        </main>
    );

};


export default EventList;