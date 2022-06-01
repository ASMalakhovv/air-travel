import {airlinesID, filtrationID, priceID, sortingID} from "../filtrationReducer";


const initState: FilterOptionsType = {
    [sortingID]: [
        {id: 1, title: '- по возрастанию цены', status: false},
        {id: 2, title: '- по убыванию цены', status: false},
        {id: 3, title: '- по времени в пути', status: false}
    ],
    [filtrationID]: [
        {id: 1, title: '- 1 пересадка', status: false},
        {id: 2, title: '- без пересадок', status: false}
    ],
    [priceID]: [
        {id: 1, title: 'От', status: 0},
        {id: 2, title: 'До', status: 0},
    ],
    [airlinesID]: [],

}

export const filterOptionReducer = (state: FilterOptionsType = initState, action: FilterOptionAction): FilterOptionsType => {
    switch (action.type) {
        case "filterOption/SET-AIRLINES": {
            return {
                ...state, [airlinesID]: action.payload.map((a: string, i: number) => {
                    return {id: i + 1, title: a, status: false}
                })
            }
        }
        case "filterOption/CHANGE-STATUS-INPUT": {
            const {filterOptionID, filterID, status} = action.payload
            return {
                ...state, [filterID]: state[filterID].map(o => {
                    return o.id === filterOptionID ? {...o, status} : o
                })
            }
        }
        case 'filterOption/CHANGE-STATUS': {

            const {filterOptionID, filterID, status} = action.payload
            return {
                ...state, [filterID]: state[filterID].map(o => {
                        return o.id === filterOptionID ? {...o, status} : {...o, status: false}
                    }
                )
            }
        }
        case "filterOption/CHANGE-STATUS-AIRLINES": {
            const {filterOptionID, filterID, status} = action.payload
            return {
                ...state, [filterID]: state[filterID].map(o => {
                        return o.id === filterOptionID ? {...o, status} : o
                    }
                )
            }
        }
        default:
            return state
    }
}

//AC
export const changeStatus = (payload: { status: boolean, filterID: string, filterOptionID: number }) => {
    return {
        type: 'filterOption/CHANGE-STATUS',
        payload
    } as const
}
export const changeStatusInput = (payload: { status: number, filterID: string, filterOptionID: number }) => {
    return {
        type: 'filterOption/CHANGE-STATUS-INPUT',
        payload
    } as const
}
export const setAirlines = (payload: Array<string>) => {
    return {
        type: 'filterOption/SET-AIRLINES',
        payload
    } as const
}
export const changeStatusAirlines = (payload: { status: boolean, filterID: string, filterOptionID: number }) => {
    return {
        type: 'filterOption/CHANGE-STATUS-AIRLINES',
        payload
    } as const
}


//types
export type FilterOptionAction = ChangeStatus | ChangeStatusInput | SetAirlines | ChangeStatusAirlines
type ChangeStatus = ReturnType<typeof changeStatus>
type ChangeStatusInput = ReturnType<typeof changeStatusInput>
type SetAirlines = ReturnType<typeof setAirlines>
type ChangeStatusAirlines = ReturnType<typeof changeStatusAirlines>

export type FilterOptions = {
    id: number
    title: string
    status: boolean | number
}
export type FilterOptionsType = {
    [key: string]: FilterOptions[]
}