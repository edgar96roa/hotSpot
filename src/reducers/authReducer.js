import { types } from '../types/types';
/* estado
{
    uid: 'afgdgbsilh25124fs4d132',
    name: 'Edgar'
}
*/

export const authReducer = ( state={}, action ) => {

    switch (action.type) {
        case types.login: //el type es login
            return {
                uid: action.payload.uid, //viene de firebase en este ejemplo
                name: action.payload.displayName
            }

        case types.logout: //retornamos el estado a vacío
            return { }
        
        default:
            return state;
    }

}
