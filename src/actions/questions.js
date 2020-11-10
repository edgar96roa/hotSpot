import { types } from '../types/types';
/*export const startUploading = (file) => {
    return ( dispatch, getState ) => {
        console.log(file);
    }
}*/

import { database } from "../firebase/firebaseConfig"
import { loadQuestions } from '../helpers/loadQuestions';

export const startLoadingQuestions = ( uid ) => {
    return async( dispatch ) => {
        const questions = await loadQuestions( uid );

        dispatch( setQuestions(questions) );
    }
}

export const refreshQuestion = ( id, question ) => ({
    type: types.questionsUpdated,
    payload: {
        id,
        question: {
            id,
            ...question
        }
    }
})

export const setQuestions = ( questions ) => {
    return {
        type: types.questionsLoad,
        payload: questions
    }
}

export const questionsStartAddNew = ( question ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        dispatch( questionAddNew(question) );

        await database.collection(`${ uid }/questionBank/questions`).add( question );

        dispatch( startLoadingQuestions(uid) ); //forma lazy

    }
}

const questionAddNew = (question) => ({
    type: types.questionsAddNew,
    payload: question
});

export const activeQuestion = ( id, question ) => ({
    type: types.questionsSetActive,
    payload: {
        id,
        ...question
    }
});

export const questionUpdated = ( question ) => ({
    type: types.questionUpdated,
    payload: question
});

export const startDeleteQuestion = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;

        await database.doc(`${ uid }/questionBank/questions/${ id }`).delete();

        dispatch( deleteQuestion(id) );

    }
}

export const deleteQuestion = (id) => ({
    type: types.questionsDelete,
    payload: id
});