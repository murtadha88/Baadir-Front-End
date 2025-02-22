import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import * as userService from '../../services/userService';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setListOfUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchUsers();
  }, [user]);


  return (
    <>
      <main>
        <h1>Welcome Back, {user.username}</h1>
        <p>Add a new event.</p>
        <Link to="/baadir/events/new">
          <button>+</button>
        </Link>

        <h4>Your Events</h4>
        <div>

          {props.companyEvents.map((event) => (
            <>
            {console.log(event)}
            {console.log(user)}

              {/* {event.userId?._id === user._id ? ( */}
                <ul key={event._id}>

                  <li>
                    <h4>{event.name}</h4>
                    <p>Description: {event.description}</p>
                    <p>Event Date: {event.date}</p>
                    <p>Location: {event.location}</p>
                    <p>Volunteer Needed: {event.volunteers}</p>
                    <p>Open to: {event.applicationDeadLine}</p>
                    <p>Created by: {event.userId?.name}</p>
                    
                      <button>Delete</button>
                    
                     
                    

                  </li>
                </ul>
              {/* ) : (
                null
              )} */}


            </>
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
