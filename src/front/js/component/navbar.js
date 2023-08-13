import React, {useContext} from "react";
import { Context } from "../store/appContext.js";
import SignupAndLogin from "./signupAndLogin.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-flex ml-auto">
					{!store.loggedIn ? <SignupAndLogin /> : (
						<button 
						className="btn btn-danger"
						onClick={() => actions.login()}
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};
