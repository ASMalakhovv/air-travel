import {v1} from 'uuid'
import {HTMLInputTypeAttribute} from "react";

export const sortingID = v1();
export const filtrationID = v1();
export const priceID = v1();
export const airlinesID = v1();

export type FiltrationType = {
    id: string
    title: string
    type: HTMLInputTypeAttribute | undefined
}
const initState: FiltrationType[] = [
    {id: sortingID, title: 'Сортировать', type: 'radio'},
    {id: filtrationID, title: 'Фильтровать', type: 'checkbox'},
    {id: priceID, title: 'Цена', type: 'number'},
    {id: airlinesID, title: 'Авиакомпании', type: 'checkbox'}
]


export const filtrationReducer = (state: FiltrationType[] = initState, action: FiltrationAction): FiltrationType[] => {
    switch (action.type) {
        case 'filtration/ADD-FILTER': {
            return {...state}
        }
        default:
            return state
    }
}

//AC
export const addFilter = (payload: FiltrationType) => {
    return {
        type: 'filtration/ADD-FILTER',
        payload
    } as const
}

//types
export type FiltrationAction = AddFilter
type AddFilter = ReturnType<typeof addFilter>