import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import LoggedOutPage from "./loggedOutPage.jsx";
import LoggedInPage from "./loggedInPage.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{!store.loggedIn ? <LoggedOutPage /> : <LoggedInPage />}			
		</div>
	);
};
