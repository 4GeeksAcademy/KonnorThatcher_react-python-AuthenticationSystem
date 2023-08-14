import React, {useState, useEffect, useContext} from 'react'
import { Context } from '../store/appContext'

const LoggedInPage = () => {
    const {store, actions} = useContext(Context)

    useEffect(() => {
        const controller = new AbortController()
        actions.getUserData()
        return () => controller.abort()
    }, [])

    return (
        <div>
            <h1>Congrats! You are logged in</h1>
            <h2>Welcome, user with email {store.userData.email}!</h2>
            <h2>Here is your lucky number:</h2>
            <h2>{store.userData.lucky_number}</h2>
        </div>
    )
}

export default LoggedInPage