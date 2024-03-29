import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

    //Aquí deberá de ir una petición para saber el rol del usuario, dependiendo de esto rooteará al dashboard correspondiente
    const role = "/teacher"
    const direction = `${role}`

    return (
        <Route { ...rest }
            component={ (props) => {
                if( !isAuthenticated ){
                    return ( <Component { ...props } /> )
                }else {
                    return ( <Redirect to={direction} /> )
                }
            }}
        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
