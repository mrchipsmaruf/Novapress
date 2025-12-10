import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase.init';

const AuthProvider = ({ children }) => {

    let googleProvider = new GoogleAuthProvider();

    let googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    let registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    let signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    let signOutUser = () => {
        return signOut(auth)
    }

    let authInfo = {
        registerUser,
        signInUser,
        googleSignIn,
        signOutUser,

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;