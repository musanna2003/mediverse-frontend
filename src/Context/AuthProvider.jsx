import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();
    const bk = "musanna"

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = ()=> {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            //TODO JWT
            // if (currentUser) {
            //     const idToken = await currentUser.getIdToken();

            //     // ✅ Send token to backend to generate cookie
            //     await axios.post('https://ph-assignment-11-backend.vercel.app/jwt', 
            //         { idToken }, 
            //         { withCredentials: true }
            //     );
            // } else {
            //     // ✅ Optional: handle logout, clear cookie if needed
            //     await axios.post('https://ph-assignment-11-backend.vercel.app/logout', {}, { withCredentials: true });
            // }

            
        });

        return () => unSubscribe();
    }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    bk
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
