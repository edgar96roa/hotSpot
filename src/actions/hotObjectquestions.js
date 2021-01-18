import Swal from 'sweetalert2';
import { types } from '../types/types';
import { database } from '../firebase/firebaseConfig';
import { loadHotObjectQuestions } from '../helpers/loadHotObjectQuestions';

export const startLoadingHotObjectQuestions = ( uid ) => {
    return async( dispatch ) => {
        const hotObjectQuestions = await loadHotObjectQuestions( uid );

        dispatch( setHotObjectQuestions(hotObjectQuestions) );
    }
}

export const setHotObjectQuestions = ( hotObjectQuestions ) => {
    return {
        type: types.questionsHotObjectLoad,
        payload: hotObjectQuestions
    }
}


export const questionsHotObjectStartAddNew = ( question ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;//esto viene de thunk

        try {
            const doc = await database.collection(`${ uid }/questionBank/hotObjectQuestions`).add( question );
            dispatch( questionsHotObjectAddNew( doc.id, question ) );
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

export const questionsHotObjectAddNew = (id, question) => ({
    type: types.questionsHotObjectAddNew,
    payload: {
        id,
        ...question
    }
});

export const activeHotObjectQuestion = ( id, question ) => ({
    type: types.questionsHotObjectSetActive,
    payload: {
        id,
        ...question
    }
});

export const questionClearActiveHotObjectQuestion = () => ({
    type: types.questionsHotObjectClearActiveQuestion
});

export const questionHotObjectStartUpdate = ( question ) => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid;

        if( !question.url ){
            delete NodeIterator.url;
        }

        const questionToFirestore = { ...question };

        delete questionToFirestore.id;

        try {

            await database.doc(`${ uid }/questionBank/hotObjectQuestions/${ question.id }`).update( questionToFirestore );

            dispatch( startLoadingHotObjectQuestions(uid) ); //forma lazy

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

export const refreshHotObjectQuestions = ( id, question ) => ({
    type: types.questionsHotObjectRefreshed,
    payload: {
        id,
        question: {
            id, ...question
        }
    }
});

export const questionHotObjectUpdated = ( question ) => ({
    type: types.questionsHotObjectUpdated,
    payload: question
});

export const startDeleteHotObjectQuestion = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        try{
            await database.doc(`${ uid }/questionBank/hotObjectQuestions/${ id }`).delete();

        dispatch( deleteHotObjectQuestion(id) );

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

export const deleteHotObjectQuestion = (id) => ({
    type: types.questionsHotObjectDelete,
    payload: id
});

export const questionsHotObjectLogout = () => ({
    type: types.questionsHotObjectLogoutCleaning
});