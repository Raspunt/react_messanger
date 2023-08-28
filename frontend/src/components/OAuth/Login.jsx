import { GoogleLogin } from 'react-google-login'
import "../../static/OAuthLogin.css"



function AuthLoginBtn(){

    const onSuccess = (res) =>{
        console.log("login success!",res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("Login failed! res: ",res);
    }

    return (
        <div className="signInButton">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText='login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    )
}


export default AuthLoginBtn