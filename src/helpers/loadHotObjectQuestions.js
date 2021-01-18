import { database } from "../firebase/firebaseConfig"

export const loadHotObjectQuestions = async( uid ) => {

    const questionsSnap = await database.collection(`${ uid }/questionBank/hotObjectQuestions`).get();

    const questions = [];

    questionsSnap.forEach( snapHijo => {
        questions.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return questions;

}