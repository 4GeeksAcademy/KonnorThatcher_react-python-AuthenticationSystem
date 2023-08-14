import React, {useState} from 'react'

const Form = ({formFunc, buttonText}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(true);
    
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

            {success ? "" : <div className='alert alert-warning mt-1 p-1 text-center'>"Invalid credentials!"</div>}
            <button className="btn btn-primary mt-2">{buttonText}</button>
        </form>
    )
}

export default Form