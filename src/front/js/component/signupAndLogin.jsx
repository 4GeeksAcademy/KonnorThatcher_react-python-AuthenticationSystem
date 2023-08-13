import React, {useContext} from 'react'
import { Context } from '../store/appContext'
import LoginForm from './loginForm.jsx'

const SignupAndLogin = () => {
    const {store, actions} = useContext(Context)

    return (
        <>
            <div className='dropdown-center me-2'>
                <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    Signup
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                    <LoginForm formFunc={actions.signup} />
                </div>
            </div>
            <div className='dropdown-center'>
                <button
                className='btn btn-primary dropdown-toggle'
                type='button'
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    {!store.loggedIn ? "Login" : "Logout"}
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                    <LoginForm formFunc={actions.login}/>
                </div>
            </div>
        </>
    )
}

export default SignupAndLogin