import initialState from '../store/state'
import { 
    SET_DATA,
    SORT_STUDIOS,
    FILTER_STUDIOS,
    SET_STAGE_FILTER,
    SET_STATE_FILTER,
    SET_SEARCH_INPUT,
    SET_VIEW,
    SET_CURRENT_STUDIO
} from "../constants/action-types"

function rootReducer(state = initialState, action) {
    if (action.type === SET_DATA) {
        let studios = action.payload
        let filteredStudios = studios.filter(studio => studio.stage.toLowerCase() !== 'signed')
        let allStates = action.payload.map(studio => studio.state)
        let states = [...new Set(allStates)].sort()
        return {
            ...state,
            studios: studios,
            filteredStudios: filteredStudios,
            states: states
        }
    } else if (action.type === SORT_STUDIOS) {
        let sortedStudios = [...state.filteredStudios]
        let asc = state.currentSortField === action.payload ? !state.ascending : true
        sortedStudios = sortedStudios.sort((a, b) => {
            let aVal = a[action.payload]
            let bVal = b[action.payload]
            if (aVal < bVal) return asc ? -1 : 1
            if (a[action.payload] > b[action.payload]) return asc ? 1 : -1
            return 0
        })
        return {
            ...state,
            filteredStudios: sortedStudios,
            currentSortField: action.payload,
            ascending: asc
        }
    } else if (action.type === FILTER_STUDIOS) {
        let filteredStudios = [...state.studios].filter(studio => studio.stage.toLowerCase() !== 'signed')
        if (state.stageFilter) {
            filteredStudios = filteredStudios.filter(studio => studio.stage.toLowerCase() === state.stageFilter.toLowerCase())
        }
        if (state.stateFilter) {
            filteredStudios = filteredStudios.filter(studio => studio.state.toLowerCase() === state.stateFilter.toLowerCase())
        }
        if (state.searchInput) {
            filteredStudios = filteredStudios.filter(studio => studio.name.toLowerCase().includes(state.searchInput.toLowerCase()))
        }
        return {
            ...state,
            filteredStudios: filteredStudios
        }
    } else if (action.type === SET_STAGE_FILTER) {
        return {
            ...state,
            stageFilter: action.payload.stageFilter
        }
    } else if (action.type === SET_STATE_FILTER) {
        return {
            ...state,
            stateFilter: action.payload.stateFilter
        }
    } else if (action.type === SET_SEARCH_INPUT) {
        return {
            ...state,
            searchInput: action.payload.searchInput
        }
    } else if (action.type === SET_VIEW) {
        return {
            ...state,
            view: action.payload.view,
            currentStudio: {}
        }
    } else if (action.type === SET_CURRENT_STUDIO) {
        return {
            ...state,
            currentStudio: action.payload.studio
        }
    } else {
        return state
    }
}

export default rootReducer