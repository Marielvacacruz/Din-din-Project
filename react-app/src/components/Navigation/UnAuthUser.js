import LoginModal from '../modals/LoginModal'
import SignupModal from '../modals/SignupModal'
import DemoLogin from '../auth/DemoLogin'

function UnAuthNav(){
    return(
        <div>
            <LoginModal/>
            <SignupModal/>
            <DemoLogin/>
        </div>
    )
};

export default UnAuthNav;
