import { useEffect, useState } from "react";

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import * as userService from '../../services/userService';


const ApplicantsList = (props) => {
    const [listOfUsers, setListOfUsers] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await userService.index()
                setListOfUsers(fetchedUsers)
            } catch (err) {
                console.log(err)
            }
        }

        if (user) fetchUsers();
    }, [user]);

    if (!listOfUsers) return <main>Loading</main>

    return (
        <ul>
            {props.applicants.map((applicant) => (
                listOfUsers.map((user) => (
                    applicant.userId === user._id ? (
                        <li key={user._id}>
                            <h4>{user.name}</h4>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </li>
                    ) : (
                        null
                    )
                ))
            ))}
        </ul>
    )
}

export default ApplicantsList;
