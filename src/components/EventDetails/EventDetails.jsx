import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as eventService from '../../services/eventService';
import { UserContext } from "../../contexts/UserContext";

const EventsDetails = (props) => {
    const { eventId } = useParams();
    const { user } = useContext(UserContext)
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const eventData = await eventService.show(eventId)
            setEvent(eventData)
        }
        fetchEvent()
    }, [eventId]);


    const handleApplicantsList = () => {
        props.handleApplicantsList(eventId);
    }

    if (!event) return <main>Loading</main>

    return (
        <div>
            <h1>events Details</h1>
            <h2>{event.name}</h2>
            <p>Description: {event.description}</p>
            <p>Date: {" "}
                {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>
            <p>Location: {event.location}</p>
            <p>Number of Volunteers: {event.volunteers}</p>
            <p>Application Deadline: {" "}
                {new Date(event.applicationDeadLine).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })}
            </p>

            {user.role === "Company" && event.userId._id === user._id ? (
                <>
                    <Link key={event._id} to={`/baadir/events/${event._id}/applications`}>
                        <button onClick={handleApplicantsList}>Applicants</button>
                    </Link>
                    <Link to={`/baadir/events/${event._id}/edit`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => props.handleDeleteEvent(event._id)}>Delete</button>
                </>
            ) : null}
        </div>
    )
}

export default EventsDetails