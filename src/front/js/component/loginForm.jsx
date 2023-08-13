import React, {useState, useContext, useEffect} from 'react'
import { Context } from '../store/appContext'

const LoginForm = ({formFunc}) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(true);

    useEffect(() => {console.log("Token:", store.token)}, [])
    
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setSuccess(await formFunc(email, password))
        setEmail("")
        setPassword("")
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input type='email' value={email} onChange={(ev) => setEmail(ev.target.value)} />

            <label>Password:</label>
            <input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} />

            {success ? "" : <p>"Something went wrong!"</p>}
            <button className="btn btn-primary mt-2">Login</button>
        </form>
    )
}

export default LoginForm