import { useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'
const EventList = (props) => {
    const { user, setUser } = useContext(UserContext)
    console.log(props.events)
    return (
        <main>

            {props.events.map((event) => (
                <ul>
                    <li>
                        <h4>{event.name}</h4>
                        <p>Description: {event.description}</p>
                        <p>Event Date: {event.date}</p>
                        <p>Location: {event.location}</p>
                        <p>Volunteer Needed: {event.volunteers}</p>
                        <p>Open to: {event.applicationDeadLine}</p>
                        <p>Created by: {event.userId?.name}</p>
                        {user.role === "Company" && user._id === event.userId ? (
                            <button>Delete</button>
                        ) : (
                            <button>Apply</button>
                        )}

                    </li>
                </ul>
            ))}
        </main>
    );

};


export default EventList;