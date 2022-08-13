import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to='/' className={({ isActive }) => isActive ? 'is-active' : undefined}>Home</NavLink>
        <NavLink to='/create' className={({ isActive }) => isActive ? 'is-active' : undefined}>create Expense</NavLink>
    </header>
)

export default Header
