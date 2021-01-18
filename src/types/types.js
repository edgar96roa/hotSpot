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

    questionsHotObjectStartAddNew: '[Questions] Start add new hot object question',
    questionsHotObjectAddNew: '[Questions] New hot object question',
    questionsHotObjectSetActive: '[Questions] Set active hot object question',
    questionsHotObjectClearActiveQuestion: '[Questions] Clear active hot object question',
    questionsHotObjectLoad: '[Questions] Load hot object questions',
    questionsHotObjectUpdated: '[Questions] Updated hot object question',
    questionsHotObjectRefreshed: '[Questions] Refresed hot object questions',
    questionHotObjectStartUpdate: '[Questions] Start update hot object question',
    questionsHotObjectDelete: '[Questions] Deleted hot object question',
    questionsHotObjectLogoutCleaning: '[Questions] Logout cleaning'
}
