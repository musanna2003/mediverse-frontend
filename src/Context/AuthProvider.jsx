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

        if (currentUser) {
        const userData = {
            name: currentUser.displayName || "N/A",
            email: currentUser.email,
            photoURL: currentUser.photoURL || "N/A",
            role: "user",
            phone: "N/A",
            address: "N/A",
            cart: [],
            createdAt: new Date().toISOString(),
        };

        // 1️⃣ Sync user to DB
        try {
            const res = await axios.post('http://localhost:3000/users', userData);
            console.log("✅ User synced with backend:", res.data);
        } catch (err) {
            console.error("❌ Failed to sync user:", err);
        }

        // 2️⃣ Get JWT from backend and store in localStorage
        try {
            const tokenRes = await axios.post('http://localhost:3000/jwt', {
            email: currentUser.email,
            });

            const token = tokenRes.data.token;
            localStorage.setItem('access-token', token);
            console.log("✅ JWT stored in localStorage");
        } catch (err) {
            console.error("❌ Failed to get JWT:", err);
        }
        } else {
        // 3️⃣ On logout: remove token
        localStorage.removeItem('access-token');
        console.log("🧹 JWT removed on logout");
        }
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
