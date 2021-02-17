import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { IsLoggedContext } from '../../../shared/contexts/IsLoggedContext';


export default function Header() {

    const { isLogged } = useContext(IsLoggedContext);

    return (
        <header className="header">
            <h1 className="header__logo">inBlog</h1>
            <nav className="header__nav nav">
                {isLogged && <IconContext.Provider value={{ className: 'nav__icon icon' }}>
                    <NavLink to="/me"><BiUser /></NavLink>
                </IconContext.Provider>}
            </nav>
        </header>
    )
}