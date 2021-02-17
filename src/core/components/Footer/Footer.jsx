import React from 'react';
import { IconContext } from 'react-icons/lib';
import { BiHomeAlt, BiSearch, BiMessageAdd, BiHeart} from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export default function Footer() {

    return (
        <footer className="footer">
            <IconContext.Provider value={{ className: 'icon' }}>
                <NavLink className="link" to="/"><BiHomeAlt /></NavLink>
                {/* <BiHomeAlt /> */}
                <BiSearch />
                <NavLink className="link" to="/addpost"><BiMessageAdd /></NavLink>
                <NavLink className="link" to="/following"><BiHeart /></NavLink>
            </IconContext.Provider>
        </footer>
    )
}