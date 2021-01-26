import { FC, useEffect, useContext } from 'react';
import Router from 'next/router';
import {AuthContext} from "../lib/auth";
import firebase from '../lib/firebase';


const SignIn: FC = () => {
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        currentUser && Router.push('/')
    }, [currentUser]);

    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }

    if (currentUser) {
        console.log(currentUser)
    }
    return (
        <div className="container">
            <button onClick={login}>googleでログインする</button>
        </div>
    )
}

export default SignIn;