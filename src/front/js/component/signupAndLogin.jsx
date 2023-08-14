import React, {useContext} from 'react'
import { Context } from '../store/appContext'
import Form from './form.jsx'

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
                    Sign Up
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                    <Form formFunc={actions.signup} buttonText={"Signup"} />
                </div>
            </div>
            <div className='dropdown-center'>
                <button
                className='btn btn-primary dropdown-toggle'
                type='button'
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    Log In
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                    <Form formFunc={actions.login} buttonText={"Login"}/>
                </div>
            </div>
        </>
    )
}

export default SignupAndLogin