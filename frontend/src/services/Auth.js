import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import actions from './api'



function Auth(props) {

    const responseGoogle = (res) => {
        actions.logIn(res).then(user => {
            props?.setUser(user)
        })
    }
    
    return (

        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_ID || `956237608940-rkcol4ero2rjnoitf08okr0nbkvjjgq8.apps.googleusercontent.com`}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    );
}

export default Auth;