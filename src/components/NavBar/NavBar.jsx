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
						<Link to="/" onClick={handleSignOut}>Sign Out</Link>
					</li>
					<li>
						<Link to="/">Dashboard</Link>
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
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/events/new">Home</Link>
					</li>
				</ul>
			)}
		</nav>
	)
}

export default NavBar
