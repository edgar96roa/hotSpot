import Swal from 'sweetalert2';
import { types } from '../types/types';
import { database } from '../firebase/firebaseConfig';
import { loadQuestions } from '../helpers/loadQuestions';

export const startLoadingQuestions = ( uid ) => {
    return async( dispatch ) => {
        const questions = await loadQuestions( uid );

        dispatch( setQuestions(questions) );
    }
}

export const setQuestions = ( questions ) => {
    return {
        type: types.questionsLoad,
        payload: questions
    }
}


export const questionsStartAddNew = ( question ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;//esto viene de thunk

        try {
            const doc = await database.collection(`${ uid }/questionBank/questions`).add( question );
            dispatch( questionAddNew( doc.id, question ) );
            Swal.fire({
                title: 'Agregar pregunta',
                text: 'La pregunta se agregó correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: '2000'
            });
        } catch(error) {
            Swal.fire({
                title: 'Agregar pregunta',
                text: error,
                icon: 'error',
                showConfirmButton: true
            });
        }

    }
}

export const questionAddNew = (id, question) => ({
    type: types.questionsAddNew,
    payload: {
        id,
        ...question
    }
});

export const activeQuestion = ( id, question ) => ({
    type: types.questionsSetActive,
    payload: {
        id,
        ...question
    }
});

export const questionClearActiveQuestion = () => ({
    type: types.questionsClearActiveQuestion
});

export const questionStartUpdate = ( question ) => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;

        if( !question.url ){
            delete NodeIterator.url;
        }

        const questionToFirestore = { ...question };

        delete questionToFirestore.id;

        try {

            await database.doc(`${ uid }/questionBank/questions/${ question.id }`).update( questionToFirestore );

            dispatch( startLoadingQuestions(uid) ); //forma lazy

            Swal.fire({
                title: 'Actualización',
                text: 'La pregunta se actualizó correctamente',
                icon: 'success',
                showConfirmButton: false,
                timer: '2000'
            });

        } catch (error) {
            
            Swal.fire({
                title: 'Actualización',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: '2000'
            });

        }
        //dispatch( refreshQuestions(question.id, question) );
    }
}

export const refreshQuestions = ( id, question ) => ({
    type: types.questionsRefreshed,
    payload: {
        id,
        question: {
            id, ...question
        }
    }
});

export const questionUpdated = ( question ) => ({
    type: types.questionUpdated,
    payload: question
});

export const startDeleteQuestion = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        try{
            await database.doc(`${ uid }/questionBank/questions/${ id }`).delete();

        dispatch( deleteQuestion(id) );

        Swal.fire({
            title: 'Eliminación',
            text: 'La pregunta se eliminó correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: '2000'
        });

        } catch(error){
            Swal.fire({
                title: 'Eliminación',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: '2000'
            });
        }
    }
}

export const deleteQuestion = (id) => ({
    type: types.questionsDelete,
    payload: id
});

export const questionsLogout = () => ({
    type: types.questionsLogoutCleaning
});

export const questionsStartSendAnswer = ( answer ) => {
    return ( dispatch, getState ) => {
        try {
            dispatch( questionSendAnswer(answer) );
        } catch(error) {
            Swal.fire({
                title: 'Enviar respuesta',
                text: error,
                icon: 'error',
                showConfirmButton: true
            });
        }

    }
}

export const questionSendAnswer = ( answer ) => ({
    type: types.questionsSendAnswer,
    payload: answer
});