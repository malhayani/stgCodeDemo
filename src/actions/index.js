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

export default {
    setData: (payload) => {
        return { type: SET_DATA, payload }
    },
    sortStudios: (payload) => {
        return { type: SORT_STUDIOS, payload }
    },
    filterStudios: (payload) => {
        return { type: FILTER_STUDIOS, payload }
    },
    setStageFilter: (payload) => {
        return { type: SET_STAGE_FILTER, payload }
    },
    setStateFilter: (payload) => {
        return { type: SET_STATE_FILTER, payload }
    },
    setSearchInput: (payload) => {
        return { type: SET_SEARCH_INPUT, payload }
    },
    setView: (payload) => {
        return { type: SET_VIEW, payload }
    },
    setCurrentStudio: (payload) => {
        return { type: SET_CURRENT_STUDIO, payload }
    }
}
