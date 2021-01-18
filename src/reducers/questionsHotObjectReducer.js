/*
    {
        questions: [],
        active: null,
        active: {
            id: '14y32ouhtibgjgfhr7',
            pregunta: ''
        }
    }

*/
import { types } from '../types/types';

const initialState = {
    questions: [{
        id: null,
        pregunta: '',
    }],
    active: null,
}

export const questionsHotObjectReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.questionsHotObjectSetActive: //funciona, no moverle
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.questionsHotObjectAddNew: //funciona, no moverle
            return {
                ...state,
                questions: [action.payload, ...state.questions]
            }

        case types.questionsHotObjectLoad: //funciona, no moverle
            return {
                ...state,
                questions: [...action.payload]
            }

        case types.questionsHotObjectUpdated:
            return {
                ...state,
                questions: state.questions.map(
                    question => (question.id === action.payload.id)
                        ? action.payload
                        : question
                )
            }

        case types.questionsHotObjectRefreshed:
            return {
                ...state,
                questions: state.questions.map(
                    question => (question.id === action.payload.id)
                        ? action.payload
                        : question
                )
            }

        case types.questionsHotObjectClearActiveQuestion:
            return {
                ...state,
                active: null
            }

        case types.questionsHotObjectDelete: //funciona, no moverle
            return {
                ...state,
                active: null,
                questions: state.questions.filter(question => question.id !== action.payload)
            }

        case types.questionsHotObjectLogoutCleaning:
            return {
                ...state,
                active: null,
                questions: []
            }

        default:
            return state;
    }

}