import { useState, useEffect } from "react";
import { useParams } from 'react-router';

import * as eventService from '../../services/eventService';
import '../../css/EventsForm.css'

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
        <>
        <h2 id="form-title">{eventId ? 'Edit Event' : 'Add a new event'}</h2>
        <div className="form-container">
            <form id="event-form" onSubmit={handleSubmit}>
                <label htmlFor="event-name">Event's Name</label>
                <input
                    id="event-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="event-description">Event's Description</label>
                <textarea
                    id="event-description"
                    type="text"
                    name="description"
                    value={formData.description}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="event-date">Event's Date</label>
                <input
                    id="event-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="event-location">Event's Location</label>
                <input
                    id="event-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="event-volunteers">Number of volunteers</label>
                <input
                    id="event-volunteers"
                    type="number"
                    name="volunteers"
                    value={formData.volunteers}
                    required
                    onChange={handleChange}
                />
                <label htmlFor="event-deadline">Applicaton Deadline</label>
                <input
                    id="event-deadline"
                    type="date"
                    name="applicationDeadLine"
                    value={formData.applicationDeadLine}
                    required
                    onChange={handleChange}
                />
                <button id="submit-button" type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}


export default EventsForm