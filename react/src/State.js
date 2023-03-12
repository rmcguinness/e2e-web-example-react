import {atom} from "recoil";

export const tabState = atom({key: "tabState", default: 0});

export const searchState = atom({
    key: "searchResults",
    default: {
        error: null,
        isReady: false,
        query: '',
        results: []
    }
})

export const dataFormState = atom({
    key: 'dataForm',
    default: {
        id: '',
        title: '',
        body: '',
        link: ''
    }
})
