import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const ApplicationsList = (props) => {
    const { user, setUser } = useContext(UserContext)

    return (
        <main>
            {user.role === "Volunteer" ? (
                <>
                    {props.applications.length === 0 ? (
                        <h2>You dont have applications!</h2>
                    ) : (
                        props.applications.map((application) => (
                            <>
                                <ul key={application._id}>
                                    {props.events.map((event, index) => (
                                        application.eventId === event._id ? (
                                            <li key={index}>
                                                <h4>{event.name}</h4>
                                                <p>Status: {application.status}</p>
                                                <p>
                                                    Date: {new Date(event.date).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                                <button>Delete</button>
                                            </li>
                                        ) : (
                                            null
                                        )
                                    ))}
                                </ul>
                                <hr />
                            </>
                        ))
                    )}
                </>
            ) : (
                <h2>Companies cannot have an applications</h2>
            )}
        </main >
    );

};


export default ApplicationsList;