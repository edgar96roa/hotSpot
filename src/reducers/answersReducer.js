/*
    {
        answers: [
            {
            id: '14y32ouhtibgjgfhr7',
            instrucciones: '',
            pregunta:archivo '',
            valor: '',
            imagen: ''
        }
        ]
    }

*/
import { types } from '../types/types';

const initialState = {
    answers: []
}

export const answersReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.answersSetAnswer:
            return {
                ...state,
                answers: [...state.answers, action.payload]
            }

        case types.answersUpdateAnswer:
            const tempAux = state.answers;

            let resolve = tempAux.map(
                answer => {
                    console.log(answer);
                    console.log(action.payload);
                    if (answer.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return answer;
                    }
                }
            );

            return {
                ...state,
                answers: resolve
            }

        case types.answersAddAnswer:
            return {
                ...state,
                answers: [action.payload, ...state.answers]
            }

        default:
            return state;
    }

}