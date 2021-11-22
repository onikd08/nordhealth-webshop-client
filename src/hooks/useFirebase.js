import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useState, useEffect } from 'react';
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);





    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    // observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, []);

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const createAccountWithEmail = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }


    const loginWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            const newUser = { ...user, displayName: name };
            setUser(newUser);

        }).catch((error) => {
            alert(error.message);
        });
    }

    const logOut = () => {
        const checking = window.confirm("Are you sure?");
        if (checking) {
            setIsLoading(true);
            signOut(auth)
                .then(() => { })
                .finally(() => setIsLoading(false));
        }

    }

    return {
        user,
        setUser,
        isLoading,
        setIsLoading,
        signInUsingGoogle,
        logOut,
        updateName,
        createAccountWithEmail,
        loginWithEmailAndPassword

    }
}

export default useFirebase;