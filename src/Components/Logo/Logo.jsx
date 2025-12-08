import React from 'react';
import { NavLink } from 'react-router';

const Logo = () => {
    return (
        <div>
            <NavLink to={"/"} className={"logoText text-[25px]"}>
                NOVAPRESS
            </NavLink>
        </div>
    );
};

export default Logo;