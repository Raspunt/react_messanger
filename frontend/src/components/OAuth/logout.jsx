import { GoogleLogin } from 'react-google-login'

const clientId = process.env.REACT_APP_GOOGLE_ID



function AuthLogoutBtn(){

    const onSuccess = (res) =>{
        console.log("login success!",res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("Login failed! res: ",res);
    }

    return (
        <div className="signOutButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='logout'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    )
}


export default AuthLogoutBtn