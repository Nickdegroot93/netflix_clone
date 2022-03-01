import React, { useEffect } from 'react';
import './Nav.css';

import NetflixLogo from './Assets/NetflixLogo.png';
import NetflixAvatar from './Assets/Avatar.png';

const Nav = () => {
	useEffect(() => {
		window.addEventListener('scroll', () => {
			const nav = document.querySelector('.nav');
			if (window.scrollY > 300) {
				nav.classList.add('nav-scrolled');
			} else {
				nav.classList.remove('nav-scrolled');
			}
		});
	}, []);

	return (
		<div className="nav">
			<img className="nav__logo" src={NetflixLogo} alt="Netflix Logo" />
			<img className="nav__avatar" src={NetflixAvatar} alt="Netflix Logo" />
		</div>
	);
};

export default Nav;
