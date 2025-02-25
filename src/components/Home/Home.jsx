import { Link } from "react-router";
import "../../css/homePage.css";
import homePageImg from "../../images/homePageImg.png";
import BaadirOrangeLogo from "../../images/BaadirOrangeLogo.png";
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
    const { user } = useContext(UserContext)
    return (
        <main className="main-container-home">
            <div className="parent-home-container">
                <div className="baadir-info">
                    {!user ? (
                        <img src={BaadirOrangeLogo} alt="Baadir Logo" />
                    ):(
                        <header>
                        <h1>
                            Welcome to Baadir, <span className="highlight">{user ? user.name : null}!</span>
                        </h1>
                        
                    </header>  
                    )}
                    
                    <p>
                        With Baadir, you can create and manage volunteer events here. 
                        Post new events, provide details, and track applications from 
                        users who are eager to volunteer.
                        <br />
                        <br />
                        Stay on top of your events and make a difference in your community.
                    </p>
                    {!user ? (
                        <Link to="/sign-in" className="get-started">Get Started</Link>
                    )  
                     : 
                     (
                        <Link to="/baadir/events" className="get-started">Events</Link>
                     )}
                    
                </div>
                <div className="home-page-img">
                    <img src={homePageImg} alt="Home page" />
                </div>
            </div>
        </main>
    );
};

export default Home;
