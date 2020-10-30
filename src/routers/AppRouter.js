import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';


export const AppRouter = () => {

    const dispatch = useDispatch();

    //para revisar el estado de firebase
    const [checking, setChecking] = useState(true);

    //para comprobar que el usuario está loggeado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            
            if( user?.uid ){
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);
            } else{
                setIsLoggedIn(false);
            }

            //se termina de revisar el estado de firebase
            setChecking(false);

        });
    }, [dispatch, setChecking])

    if( checking ){
        return(
            <h1>Espere...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
