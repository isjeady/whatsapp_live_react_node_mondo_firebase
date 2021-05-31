import React from 'react'
import "./Login.css"
import { auth,provider} from "../firebase"
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../reducer'

const Login = () => {
    const [{user}, dispatch] = useStateValue();

    const login = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            dispatch({
                type : actionTypes.SET_USER,
                user : result.user
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src="data:image/png;base64,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" />
                <div className="login__text">
                    <h1>Login</h1>
                    {JSON.stringify(user)}
                </div>
                <button type="submit" onClick={login}>
                    Login con Google
                </button>
            </div>
        </div>
    )
}

export default Login
