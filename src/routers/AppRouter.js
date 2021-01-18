import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase } from '../firebase/firebaseConfig';
import { AuthRouter } from './AuthRouter';
import { PublicRoute } from './PublicRoute';

import { login } from '../actions/auth';
import { PrivateRouteTeacher } from './PrivateRouteTeacher';
import { DashboardRoutesTeacher } from './DashboardRoutesTeacher';
import { PrivateRouteStudent } from './PrivateRouteStudent';
import { DashboardRoutesStudent } from './DashboardRoutesStudent';
import { startLoadingQuestions } from '../actions/questions';
import { startLoadingHotObjectQuestions } from '../actions/hotObjectquestions';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //para revisar el estado de firebase
    const [checking, setChecking] = useState(true);

    //para comprobar que el usuario está loggeado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {

            if ( user?.uid ){
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);

                dispatch( startLoadingQuestions( user.uid ) );

                dispatch( startLoadingHotObjectQuestions( user.uid ) );
            }  
            else{
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
        
    }, [dispatch, setChecking])

    if( checking ){
        return(
            <div>
                cargando
            </div>
        );
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PrivateRouteTeacher
                        path="/teacher"
                        component={ DashboardRoutesTeacher }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRouteStudent
                        path="/student"
                        component={ DashboardRoutesStudent }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    );
}