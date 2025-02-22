import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as eventService from '../../services/eventService';

const EventsDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const eventData = await eventService.show(eventId)
            setEvent(eventData)
        }
        fetchEvent()
    }, [eventId]);

    if (!event) return <main>Loading</main>

    return (
        <div>
            <h1>events Details</h1>
            <h2>{event.name}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <p>Number of Volunteers: {event.volunteers}</p>
            <p>Application Deadline: {event.applicationDeadLine}</p>

            {/* {events.author._id === user._id && (
                <button onClick={() => props.handleDeleteevents(id)}>Delete</button>
            )} */}
        </div>
    )
}

export default EventsDetails