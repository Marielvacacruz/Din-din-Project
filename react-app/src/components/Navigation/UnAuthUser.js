import LoginModal from '../modals/LoginModal'
import SignupModal from '../modals/SignupModal'
import DemoLogin from '../auth/DemoLogin'

function UnAuthNav(){
    return(
        <div className='nav-button-container'>
            <LoginModal/>
            <SignupModal/>
            <DemoLogin/>
        </div>
    )
};

export default UnAuthNav;
