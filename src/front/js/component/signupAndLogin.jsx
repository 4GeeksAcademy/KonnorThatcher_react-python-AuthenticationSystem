import React, {useContext} from 'react'
import { Context } from '../store/appContext'

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
                <div className="dropdown-menu dropdown-menu-end me-0">
                    <div className="d-flex">
                        <button 
                        className='btn btn-primary'
                        onClick={() => actions.login()}
                        >
                            Signup
                        </button>
                    </div>
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
                <div className="dropdown-menu dropdown-menu-end me-0">
                    <div className="d-flex">
                        <button 
                        className='btn btn-primary'
                        onClick={() => actions.login()}
                        >
                            {!store.loggedIn ? "Login" : "Logout"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupAndLogin