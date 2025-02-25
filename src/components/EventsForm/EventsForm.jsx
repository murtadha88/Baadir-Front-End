import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import * as eventService from '../../services/eventService';
import '../../css/EventsForm.css'
import BackButton from "../../images/BackButton.png";
import LocationIcon from "../../images/LocationIcon.png";
import CalendarIcon from "../../images/CalendarIcon.png";

const EventsForm = (props) => {
    const { eventId } = useParams();
    const initialState = {
        name: '',
        description: '',
        date: '',
        location: '',
        volunteers: 0,
        applicationDeadLine: ''
    }
    const [formData, setFormData] = useState(
        initialState
    )
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (eventId) {
            props.handleEditEvent(eventId, formData);
        } else {
            props.handleAddEvent(formData)
        }
    }
    useEffect(() => {
        const fetchEvent = async () => {
            const eventData = await eventService.show(eventId)
            const formattedEventData = {
                ...eventData,
                date: eventData.date.split('T')[0],
                applicationDeadLine: eventData.applicationDeadLine.split('T')[0],
            };
            setFormData(formattedEventData);
        }
        if (eventId) fetchEvent()
        return () => setFormData(initialState);
    }, [eventId]);
    return (
        <div className="full-container">
        <header className="header-container">
        <h2 id="form-title">{eventId ? 'Edit Event' : 'Add a new event'}</h2>
        <p className="company-text">Company</p>
        {/* <img id='baadir-logo' src="src/images/Logo.png" alt="Baadir logo" /> */}
        <div className="back-button-container">
        <a href="/" id="back-button-img">
            <img src={BackButton} alt="Back button" />
        </a>
            <p>View all events</p>
            </div>
        </header>
        <div className="form-container">
            <form id="post-event-form" onSubmit={handleSubmit}>
                <label id="post-event-label" htmlFor="event-name">event's Name<span id="required-star">*</span></label>
                <input
                    className="post-event-input"
                    id="event-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                />
                <label id="post-event-label" htmlFor="event-description">event's Description<span id="required-star">*</span></label>
                <textarea
                    id="event-description"
                    type="text"
                    name="description"
                    value={formData.description}
                    required
                    onChange={handleChange}
                />
                <label id="post-event-label" htmlFor="event-volunteers">number of volunteers<span id="required-star">*</span></label>
                <input
                    className="post-event-input"
                    id="event-volunteers"
                    type="number"
                    name="volunteers"
                    value={formData.volunteers}
                    required
                    onChange={handleChange}
                />
                <div className="event-date-location-container">
                <label id="post-event-label" htmlFor="event-location">
                    {<img id="location-img" src={LocationIcon} alt="location-icon" />}
                </label>
                <input
                    id="event-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    required
                    onChange={handleChange}
                />
                <label id="post-event-label" htmlFor="event-date">
                {<img id="date-img" src={CalendarIcon} alt="deadline-icon" />}
                </label>
                <input
                    id="event-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={handleChange}
                />
                <label id="post-event-label" htmlFor="event-deadline">
                    {<img id="date-img" src={CalendarIcon} alt="deadline-icon" />}
                </label>
                <input
                    id="event-deadline"
                    type="date"
                    name="applicationDeadLine"
                    value={formData.applicationDeadLine}
                    required
                    onChange={handleChange}
                    placeholder="Deadline"
                />
                </div>
                <button id="post-button" type="submit">Post</button>
            </form>
        </div>
        </div>
    )
}
export default EventsForm