import { Link } from 'react-router'
import { useContext } from 'react'
import BaadirLogo from "../../images/BaadirLogo.png";
import signOutLogo from "../../images/signoutLogo.png";
import { UserContext } from '../../contexts/UserContext'
import "../../css/NavBar.css"
const NavBar = () => {
	const { user, setUser } = useContext(UserContext)

	const handleSignOut = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('role')
		setUser(null)
	}

	return (
		<nav className="navbar">
			<Link to="/"  className="nav-home"> <img src={BaadirLogo} alt="Baadir Logo" /></Link>
			
			{user ? (
				  <ul className="nav-links">
						
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
					<li className="nav-signout">
						<Link to="/" onClick={handleSignOut}> <img src={signOutLogo} alt="Sign Out" /></Link>
					</li>
				</ul>
			) : (
				<ul className="nav-links-not-signed">
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
