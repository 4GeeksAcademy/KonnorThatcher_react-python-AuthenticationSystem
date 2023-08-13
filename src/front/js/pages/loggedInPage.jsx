import React from 'react'

const LoggedInPage = () => {
  return (
    <div>
        <h1>Congrats! You are logged in</h1>
        <h2>Too bad there isn't anything on the page right now</h2>
        <h2>This is the url for the API:</h2>
        <h2>{process.env.BACKEND_URL}</h2>
    </div>
  )
}

export default LoggedInPage