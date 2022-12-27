import { Link } from "react-router-dom";

function HomePage(){
    return(
        <div className="home-page">
            <div className="heading-container">
                <h1 className="heading">Explore by city</h1>
            </div>
            <div className="link-container">
                <Link className="city-link" to='/restaurants/LA'><p>New Orleans</p></Link>
                <Link className="city-link" to='/restaurants/WA'><p>Seattle</p></Link>
                <Link className="city-link" to='/restaurants/CA'><p>Los Angeles</p></Link>
                <Link className="city-link" to='/restaurants/MI'><p>Detroit</p></Link>
            </div>

        </div>
    )
};

export default HomePage;
