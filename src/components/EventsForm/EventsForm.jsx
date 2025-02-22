import { useState, useEffect } from "react";
import { useParams } from 'react-router';

import * as eventService from '../../services/eventService';
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
    
    props.handleAddEvent(formData)
    }


useEffect(() => {
    const fetchEvent = async () => {
        const eventData = await eventService.show(eventId)
        setFormData(eventData)
    }
    if (eventId) fetchEvent()
    return () => setFormData(initialState);
}, [eventId]);

return (
    <div>
        <h2>{eventId ? 'Edit Event' : 'New Event'}</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Event's Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                required
                onChange={handleChange}
            />
            <label htmlFor="">Event's Description</label>
            <input
                type="text"
                name="description"
                value={formData.description}
                required
                onChange={handleChange}
            />
            <label htmlFor="">Event's Date</label>
            <input
                type="date"
                name="date"
                value={formData.date}
                required
                onChange={handleChange}
            />
            <label htmlFor="">Event's Location</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                required
                onChange={handleChange}
            />
            <label htmlFor="">Number of volunteers</label>
            <input
                type="number"
                name="volunteers"
                value={formData.volunteers}
                required
                onChange={handleChange}
            />
            <label htmlFor="">Applicaton Deadline</label>
            <input
                type="date"
                name="applicationDeadLine"
                value={formData.applicationDeadLine}
                required
                onChange={handleChange}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
)}


export default EventsForm