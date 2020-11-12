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
        id: new Date().getTime(),
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
                questions:[
                    ...state.questions,
                    action.payload
                ]
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
        
        case types.questionsDelete: //funciona, no moverle
            return {
                ...state,
                active: null,
                questions: state.questions.filter( question => question.id !== action.payload )
            }

        default:
            return state;
    }

}