import React from 'react';
import './../App.css';
import { Link } from 'react-router-dom';

import logo from '../../src/tree.png';

function Nav() {

    return (
        <div>
            <div>
                <img className="logo" src={logo} alt = "test" />
            </div>
            <ul>
                <li className="active"> 
                     <Link to="/familytree">HOME</Link>
                </li>
                <li>
                    <Link to="/familytree/dashboard">DASHBOARD</Link>
                </li>
                <li>
                    <Link to="/familytree/members">MEMEBRS</Link>
                </li>
                <li>
                    <Link to="/familytree/members/map">MAP</Link>
                </li>
                <li>
                    <Link to="/familytree/about">ABOUT US</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav;
