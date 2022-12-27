import { useDispatch } from "react-redux";
import { login } from "../../store/session";

function DemoLogin(){
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        const email = 'demo@aa.io';
        const password = 'password';
        dispatch(login(email, password));
    };

    return(
        <button className="nav-button" id="demo-login" onClick={(e) => handleClick(e)}>
            Demo User
        </button>
    )
};

export default DemoLogin;
