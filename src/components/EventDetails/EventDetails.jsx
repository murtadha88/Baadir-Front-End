import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as eventService from '../../services/eventService';
import { UserContext } from "../../contexts/UserContext";
import "../../css/EventDetails.css"
import LocationIcon from "../../images/LocationIcon.png";
import CalendarIcon from "../../images/CalendarIcon.png";

const EventsDetails = (props) => {
    const { eventId } = useParams();
    const { user } = useContext(UserContext)
    const [event, setEvent] = useState(null);

    const handleApplication = (eventId) => {
        props.handleAddApplication(eventId)
    }

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
        <main className="company-events-container">
            <header>
                <h1>Event Details</h1>
                <p className="role">{user? (user.role) : null}</p>
            </header>

            <div className="event-details-container">
                <h2>{event.name}</h2>
                <p className="event-description">{event.description}</p>
                <p className="event-volunteers"><span>{event.volunteers}</span>Volunteers Needed</p>

                <div className="event-detail-item">
                    <div className="detail-item">
                        <img src={LocationIcon} alt="Location Icon" className="location" /> {event.location}
                        <span> Location </span>
                    </div>

                    <div className="detail-item">
                        <img src={CalendarIcon} alt="Calendar Icon" /> {" "}
                        {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        <span> Event Date </span>
                    </div>


                    <div className="deadline-section">
                        <img src={CalendarIcon} alt="Calendar Icon" /> {" "}
                        {new Date(event.applicationDeadLine).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        <span> Deadline </span>
                    </div>
                </div>

                <div className="button-group">
                    {user.role !== "Company" ? (
                        <button onClick={() => handleApplication(event._id)}>Apply</button>
                    ) : (
                        null
                    )}

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
            </div>
        </main>
    )
}

export default EventsDetails