import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { MenuBar } from '../components/auth/MenuBar';
import { AboutUsScreen } from '../components/auth/AboutUsScreen';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { ResetPasswordScreen } from '../components/auth/ResetPasswordScreen';
import { Footer } from '../components/commons/Footer';

import '../styles/generalStyles.css';

export const AuthRouter = () => {
    return (
        <div className="App">
            <MenuBar />
                <div className="FormVerticalCentered">
                    <Switch>
                        <Route
                            exact
                            path="/auth/aboutUs"
                            component={ AboutUsScreen }
                        />
                        
                        <Route 
                            exact
                            path="/auth/login"
                            component={ LoginScreen }
                        />

                        <Route 
                            exact
                            path="/auth/register"
                            component={ RegisterScreen }
                        />

                        <Route
                            exact
                            path="/auth/resetPassword"
                            component={ ResetPasswordScreen }
                        />

                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            <Footer />
        </div>
    );
}
