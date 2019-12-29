import React from 'react';
import './../App.css';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="page-style">
            <p>Developer</p>
            <h1><Link to={`/familytree/members/61`}>Ravindra Desai</Link>(<Link to={`/familytree/admin`}>ADMIN</Link>)</h1>
            <br/>
            <p>Development Supporters</p>
            <h2><Link to="/familytree/about">Arpan Kumar</Link></h2>
            <h2><Link to="/familytree/about">Harish H N</Link></h2>
            <br/>
            <p>Family Supporters</p>
            <h2><Link to={`/familytree/members/56`}>Mahadevi Babu Desai</Link></h2>
            <h2><Link to={`/familytree/members/62`}>Priyanka Ravindra Desai</Link></h2>
            <h2><Link to={`/familytree/members/63`}>Ojasvi Ravindra Desai</Link></h2>
            <h2><Link to={`/familytree/members/58`}>Malagoud Babu Desai</Link></h2>
            <h2><Link to={`/familytree/members/38`}>Praveen Mahaling Mungurwadi</Link></h2>
        </div>
    )
}

export default About;

