export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language"; 

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "en";
}

interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: { name:string; code:string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;
//為了降低Action過程中出錯的可能，於是採用工廠模式產生Action，俗稱ActionCreater
export const changeLanguageActionCreator = (
    languageCode: "zh" | "en"
):ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode
    }
}

export const addLanguageActionCreator = (
    name:string,
    code:string
):AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code }
    }
}