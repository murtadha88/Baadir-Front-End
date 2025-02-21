import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";

import { UserContext } from "../../contexts/UserContext";

const EventsDetails = (props) => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>events Details</h1>
            <h2>events Name: {props.events.name}</h2>
            <p>Description: {props.events.description}</p>
            <p>Date: {props.events.date}</p>
            <p>Location: {props.events.location}</p>
            <p>Number of Volunteers: {props.events.volunteers}</p>
            <p>Application Deadline: {props.events.applicationDeadLine}</p>

            {/* {events.author._id === user._id && (
                <button onClick={() => props.handleDeleteevents(id)}>Delete</button>
            )} */}
        </div>
    )
}

export default EventsDetails