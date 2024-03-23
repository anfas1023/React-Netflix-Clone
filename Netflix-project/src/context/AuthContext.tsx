import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, onAuthStateChanged,User } from 'firebase/auth';
import { auth,db } from '../Services/firebase';
 import {doc,setDoc} from 'firebase/firestore'

type AuthContextType = {
    user: User | null;
    signUp:  (email: string, password: string) => Promise<UserCredential>
    logIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
}



const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    function signUp(email: string, password: string): Promise<UserCredential> {
        const userRef=doc(db,'users',email);
        setDoc(userRef,{
            favShow:[],
        })
       return  createUserWithEmailAndPassword(auth, email, password);
    }

    

    function logIn(email: string, password: string): Promise<UserCredential> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut(): Promise<void> {
        return signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}


export function userAuth(){
    const context = useContext(AuthContext);

    return context;
}
