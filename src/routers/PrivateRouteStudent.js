import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PrivateRouteStudent = ({
    isAuthenticated,
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

PrivateRouteStudent.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
