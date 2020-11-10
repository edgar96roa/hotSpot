import { database } from "../firebase/firebaseConfig"

export const loadQuestions = async( uid ) => {

    const questionsSnap = await database.collection(`${ uid }/questionBank/questions`).get();

    const questions = [];

    questionsSnap.forEach( snapHijo => {
        questions.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return questions;

}