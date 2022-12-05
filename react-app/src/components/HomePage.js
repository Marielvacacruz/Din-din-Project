import { Link } from "react-router-dom";

function HomePage(){
    return(
        <div>
            <h1>Explore by city</h1>
            <Link to='/restaurants/LA'>New Orleans</Link>
            <Link to='/restaurants/WA'>Seattle</Link>
            <Link to='/restaurants/CA'>Los Angeles</Link>
            <Link to='/restaurants/MI'>Detroit</Link>
        </div>
    )
};

export default HomePage;
