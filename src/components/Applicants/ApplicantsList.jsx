import { useEffect, useState } from "react";

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import * as userService from '../../services/userService';
import "../../css/Applicatns.css"
import userIcon from "../../images/user.png";

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
        <main className="main-container">
            <header>
                <h1>
                    Applicants
                </h1>
                <p className="role">{user? (user.role) : null}</p>
            </header>

            {props.applicants.length === 0 ? (
                <h2 id="Empty">You dont have Applicants!</h2>
            ) : (
                <ul className="applications-grid">
                    {props.applicants.map((applicant) => (
                        listOfUsers.map((user) => (
                            applicant.userId === user._id ? (
                                <div className='container'>
                                    <div className='tag'></div>
                                    <li key={user._id} className='application-card'>
                                        <h4 className="user-name-container"><img src={userIcon} alt="user icon" /><span className="user-name">{user.name}</span></h4>
                                        <p><span className="email">Email:</span> <b>{user.email}</b> </p>
                                        <p><span className="phone">Phone:</span> <b> {user.phone}</b> </p>
                                    </li>
                                </div>
                            ) : (
                                null
                            )
                        ))
                    ))}
                </ul>
            )}


        </main>
    )
}

export default ApplicantsList;
