import { createSlice } from '@reduxjs/toolkit'

type CountryCheckboxType = {
    checkboxPoland: string
    checkboxCzech: string
    checkboxRomania: string
    checkboxSlovakia: string
    checkboxLithuania: string
    checkboxHolland: string
    checkboxGermany: string
    checkboxGreece: string
    checkboxSpain: string
    checkboxCyprus: string
    checkboxFrance: string
    checkboxFinland: string
    checkboxEngland: string
}

const initialState: CountryCheckboxType = {
    checkboxPoland: '',
    checkboxCzech: '',
    checkboxRomania: '',
    checkboxSlovakia: '',
    checkboxLithuania: '',
    checkboxHolland: '',
    checkboxGermany: '',
    checkboxGreece: '',
    checkboxSpain: '',
    checkboxCyprus: '',
    checkboxFrance: '',
    checkboxFinland: '',
    checkboxEngland: '',
}

export const countryCheckboxReducer = createSlice({
    name: 'countryCheckbox',
    initialState,
    reducers: {
        polandChecked: (state, action) => ({
            ...state,
            checkboxPoland: action.payload,
        }),
        czechChecked: (state, action) => ({
            ...state,
            checkboxCzech: action.payload,
        }),
        romaniaChecked: (state, action) => ({
            ...state,
            checkboxRomania: action.payload,
        }),
        slovakiaChecked: (state, action) => ({
            ...state,
            checkboxSlovakia: action.payload,
        }),
        lithuaniaChecked: (state, action) => ({
            ...state,
            checkboxLithuania: action.payload,
        }),
        hollandChecked: (state, action) => ({
            ...state,
            checkboxHolland: action.payload,
        }),
        germanyChecked: (state, action) => ({
            ...state,
            checkboxGermany: action.payload,
        }),
        greeceChecked: (state, action) => ({
            ...state,
            checkboxGreece: action.payload,
        }),
        spainChecked: (state, action) => ({
            ...state,
            checkboxSpain: action.payload,
        }),
        cyprusChecked: (state, action) => ({
            ...state,
            checkboxCyprus: action.payload,
        }),
        franceChecked: (state, action) => ({
            ...state,
            checkboxFrance: action.payload,
        }),
        finlandChecked: (state, action) => ({
            ...state,
            checkboxFinland: action.payload,
        }),
        englandChecked: (state, action) => ({
            ...state,
            checkboxEngland: action.payload,
        }),
        clearAllCountrysCheckboxes: (state) => ({
            checkboxPoland: '',
            checkboxCzech: '',
            checkboxRomania: '',
            checkboxSlovakia: '',
            checkboxLithuania: '',
            checkboxHolland: '',
            checkboxGermany: '',
            checkboxGreece: '',
            checkboxSpain: '',
            checkboxCyprus: '',
            checkboxFrance: '',
            checkboxFinland: '',
            checkboxEngland: '',
        }),
    },
})

export const {
    polandChecked,
    czechChecked,
    romaniaChecked,
    slovakiaChecked,
    lithuaniaChecked,
    hollandChecked,
    germanyChecked,
    greeceChecked,
    spainChecked,
    cyprusChecked,
    franceChecked,
    finlandChecked,
    englandChecked,
    clearAllCountrysCheckboxes,
} = countryCheckboxReducer.actions
export default countryCheckboxReducer.reducer
