import { Link } from 'react-router';
const EventList = (props) => {

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

                    </li>
                </ul>
            ))}
        </main>
    );

};


export default EventList;