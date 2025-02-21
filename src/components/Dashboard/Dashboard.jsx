import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService'

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [listOfUsers, setListOfUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const fetchedUsers = await userService.index()
            setListOfUsers(fetchedUsers)
        } catch (err) {
            console.log(err)
        }
    }

    if (user) fetchUsers()
  }, [user])

  return (
    <>
    <main>
      <h1>Welcome Back, {user.username}</h1>
      <p>
        Add a new event.
      </p> 
      <Link to="/baadir/events/new"><button>+</button></Link>
      <h4>event name</h4>
      
      {/* <ul>
        {listOfEvents.map((events) => (
            <li>
            <h4>{events.name}</h4>
            <p>{events.description}</p>
            <p>{events.date}</p>
            <p>{events.location}</p>
            <p>{events.volunteers}</p>
            <p>{events.applicationDeadLine}</p>
            </li>
        ))}
        </ul> */}
      
      {/* {listOfUsers.map((userObj) => (
        <h4>{userObj.username}</h4>
      ))} */}
    </main>
    </>
  );
};

export default Dashboard