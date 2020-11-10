import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRouteTeacher = ({
    isAuthenticated,
    //isTeacher,
    component: Component,
    ...rest
}) => {

    return (
        <Route { ...rest }
            component={ (props) => {
                if( isAuthenticated ) {
                    return ( <Component { ...props } /> )
                } else {
                    return ( <Redirect to="/auth/login" /> )
                }
            }}
        
        />
    )
}

PrivateRouteTeacher.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    //isTeacher: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
