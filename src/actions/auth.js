import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { questionsLogout } from './questions';
import { finishLoading, startLoading } from './ui';

export const startRegister = (email, password, name) => {
    return (dispatch) => {

        dispatch( startLoading() );

        try{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({ user }) => {
                
                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                );

                dispatch( finishLoading() );
            })
            .catch(error => {
                //esto se muestra en pantalla si hay internet
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: '2500'
                });
                dispatch( finishLoading() );
            })
        } catch(e){
            Swal.fire('Error', e.message, 'error');
        }
    }
};

//esto es para hacer que la acción sea asíncrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        
        dispatch( startLoading() );

        try{

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then( ({user}) => {
                    dispatch( login( user.uid, user.displayName ) );

                    dispatch( finishLoading() );
                })
                .catch( error=> {
                    dispatch( finishLoading() );
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: '2500'
                    });
                })

        }catch(e){
            dispatch( finishLoading() );
            Swal.fire('Error', e.message, 'error');
        }

    }
};

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        try {
            firebase.auth().signInWithPopup( googleAuthProvider )
                .then( ({ user }) => {
                    dispatch(
                        login( user.uid, user.displayName )
                    );
                }).catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: error.message,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: '2500'
                    });
                })
        } catch(e){
            console.log("g");
            Swal.fire('Error', e.message, 'error');
        }
    }
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};

//asíncrono
export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( questionsLogout() );
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}