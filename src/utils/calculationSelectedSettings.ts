import {FilterOptionsType} from "../components/Filtration/FilterOption/filterOptionReducer";


export const calculationSelectedSettings = (filtersID: string[], filtersOptions: FilterOptionsType):FilterOptionsType => {
    let filters: FilterOptionsType = {};
    filtersID.forEach(f => {
        const array = filtersOptions[f].filter(o => o.status || o.status === 0)
        filters = {...filters,[f]:[...array]}
    })
    return filters
}