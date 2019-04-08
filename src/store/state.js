const initialState = {
    studios: [],
    filteredStudios: [],
    currentStudio: {},
    stages: [
        'Presales',
        'Preopen',
        'Pregrandopen',
        'Grandopen',
        'Open30',
        'Open'
    ],
    states: [],
    currentSortField: 'name',
    ascending: true,
    stageFilter: '',
    stateFilter: '',
    searchInput: '',
    view: 'list'
}

export default initialState
