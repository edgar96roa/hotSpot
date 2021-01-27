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
    reactiveList: []
}

export const answersReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.answersSetAnswer:
            return {
                ...state,
                reactiveList: [...state.reactiveList, action.payload]
            }

        case types.answersUpdateAnswer:
            const tempAux = state.reactiveList;

            let resolve = tempAux.map(
                answer => {
                    if (answer.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return answer;
                    }
                }
            );

            return {
                ...state,
                reactiveList: resolve
            }

        default:
            return state;
    }

}