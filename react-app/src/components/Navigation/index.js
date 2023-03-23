import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div id="navbar-container">
				<div id="navbar-left">
					<NavLink exact to="/">
						<div id="logo">
							<i className="logo-icon fa-solid fa-robot fa-2xl" />
							<p id="logo-text">BrainBash</p>
						</div>
					</NavLink>
				</div>
				{isLoaded && (
					<div id="navbar-right">
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
			<div id="takes-up-space"></div>
		</>
	);
}

export default Navigation;
