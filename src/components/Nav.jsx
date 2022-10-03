import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <nav>
            <img src="/atom.png" alt="atom icon" />
            <NavLink to="/">Home</NavLink>

            <NavLink to="/chaos">Chaos</NavLink>

            <NavLink to="/relativity">Relativity</NavLink>
        </nav>
    );
}
