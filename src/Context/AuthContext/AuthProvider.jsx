import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQueryClient } from "@tanstack/react-query";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    EmailAuthProvider,
    linkWithCredential
} from "firebase/auth";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from '../../Firebase/Firebase.init';

let googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);

    let googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    let registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const hasPasswordProvider = async (email) => {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return methods.includes("password");
    };

    let signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const setPasswordForGoogleUser = async (password) => {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("No logged-in user");
        }

        const credential = EmailAuthProvider.credential(
            user.email,
            password
        );
        return await linkWithCredential(user, credential);
    };

    let signOutUser = async () => {
        setLoading(true);
        await signOut(auth);
        queryClient.clear();
        setUser(null);
        setLoading(false);
    };

    let updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    let authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        googleSignIn,
        signOutUser,
        updateUserProfile,
        setPasswordForGoogleUser,
        hasPasswordProvider,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
