import LogoutButton from "../auth/LogoutButton";
import { Link } from "react-router-dom";

function AuthNav(){
    return(
        <div className='nav-button-container'>
            <LogoutButton/>
            <Link to='/profile'>
                <button className="nav-button" id="profile-button">Profile</button>
            </Link>
        </div>
    )
};

export default AuthNav;
