//import Swal from 'sweetalert2';
import { types } from '../types/types';

export const answersStartSendAnswers = ( questionWithAnswer ) => {
    return ( dispatch, getState ) => {
        
        console.log(questionWithAnswer);
        /*try {
            dispatch( ansSendAnswer(answer) );
        } catch(error) {
            Swal.fire({
                title: 'Enviar respuesta',
                text: error,
                icon: 'error',
                showConfirmButton: true
            });
        }*/
    }
}

export const answersSetAnswer = ( questionWithAnswer ) => ({
    type: types.answersSetAnswer,
    payload: questionWithAnswer
});

export const answersUpdateAnswer = ( answer ) => ({
    type: types.answersUpdateAnswer,
    payload: answer
});