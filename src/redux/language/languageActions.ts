export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language"; 

interface ChangeLanguageAction {
    type: "change_language";
    payload: "zh" | "en";
}

interface AddLanguageAction {
    type: "add_language";
    payload: { name:string; code:string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

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