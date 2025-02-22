import { Link } from 'react-router'
import { useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

	const handleSignOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		setUser(null)
	}

	return (
		<nav>
			{user ? (
				<ul>
					{user.role === "Company" ? (
						<li>Welcome, Admin</li>
					) : (
						<li>Welcome, Volunteer</li>
					)}
					<li>
						<Link to="/">Home</Link>
					</li>
					{user.role === "Company" ? (
						<>
							<li>
								<Link to="/baadir/companyEvents">My Events</Link>
							</li>
							<li>
								<Link to="/baadir/events/new">Add Events</Link>
							</li>
						</>
					) : (
						<li>
							<Link to="/baadir/applications">Applications</Link>
						</li>
					)}
					<li>
						<Link to="/baadir/events">Events</Link>
					</li>
					<li>
						<Link to="/" onClick={handleSignOut}>Sign Out</Link>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to="/sign-up">Sign Up</Link>
					</li>
					<li>
						<Link to="/sign-in">Sign In</Link>
					</li>
				</ul>
			)}
		</nav>
	)
}

export default NavBar
