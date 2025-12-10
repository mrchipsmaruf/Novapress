import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const UseAuth = () => {
    let authInfo = use(AuthContext);
    return authInfo;
};

export default UseAuth;