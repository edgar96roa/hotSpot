/*estos son los types que usaré en el reducer*/
export const types = {
    
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set error',
    uiRemoveError: '[UI] Remove error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    uiOpenModal: '[UI] Open modal',
    uiCloseModal: '[UI] Close modal',

    questionsStartAddNew: '[Questions] Start add new question',
    questionsAddNew: '[Questions] New question',
    questionsSetActive: '[Questions] Set active question',
    questionsClearActiveQuestion: '[Questions] Clear active question',
    questionsLoad: '[Questions] Load questions',
    questionsUpdated: '[Questions] Updated question',
    questionsRefreshed: '[Questions] Refresed questions',
    questionStartUpdate: '[Questions] Start update question',
    questionsFileUrl: '[Questions] Updated image url',
    questionsDelete: '[Questions] Deleted question',
    questionsLogoutCleaning: '[Questions] Logout cleaning',

    answersSetAnswer: '[Answers] Set answer',
    answersUpdateAnswer: '[Answers] Update answer',
    answersAddAnswer: '[Answers] Add answer',
}
