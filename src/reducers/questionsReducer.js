/*
    {
        questions: [],
        active: null,
        active: {
            id: '14y32ouhtibgjgfhr7',
            instrucciones: '',
            pregunta: '',
            valor: '',
            archivo: ''
        }
    }

*/
import { types } from '../types/types';

const initialState = {
    questions: [{
        id: null,
        instrucciones: '',
        pregunta: '',
        valor: ''
    }],
    active: null
}

export const questionsReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.questionsSetActive: //funciona, no moverle
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.questionsAddNew: //funciona, no moverle
            return {
                ...state,
                questions:[ action.payload, ...state.questions ]
            }

        case types.questionsLoad: //funciona, no moverle
            return {
                ...state,
                questions: [ ...action.payload ]
            }

        case types.questionsUpdated:
            return {
                ...state,
                questions: state.questions.map(
                    question => (question.id === action.payload.id)
                        ? action.payload
                        : question 
                )
            }

        case types.questionsRefreshed:
            return {
                ...state,
                questions: state.questions.map(
                    question => (question.id === action.payload.id)
                        ? action.payload
                        : question 
                )
            }

        case types.questionsClearActiveQuestion:
            return {
                ...state,
                active: null
            }
        
        case types.questionsDelete: //funciona, no moverle
            return {
                ...state,
                active: null,
                questions: state.questions.filter( question => question.id !== action.payload )
            }

        case types.questionsLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }

}