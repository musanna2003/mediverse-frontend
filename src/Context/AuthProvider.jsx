import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

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

            // For database
            if (currentUser) {
                const userData = {
                    name: currentUser.displayName || "N/A",
                    email: currentUser.email,
                    photoURL: currentUser.photoURL || "N/A",
                    role: "user",
                    phone: "N/A",
                    address: "N/A",
                    cart : [],
                    createdAt: new Date().toISOString(),
                };

                try {
                    const res = await axios.post('http://localhost:3000/users', userData);
                    console.log("✅ User synced with backend:", res.data);
                } catch (err) {
                    console.error("❌ Failed to sync user:", err);
                }
            }

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
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
