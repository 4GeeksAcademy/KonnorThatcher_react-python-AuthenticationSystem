import React from "react";
import LoginDropdown from "./loginDropdown.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<LoginDropdown />
				</div>
			</div>
		</nav>
	);
};
