import { fetchInit, fetchSuccess, fetchFailure } from '../actions/loadingActions'

const loadingReducer = (state, action) => {
    switch (action.type) {
        case fetchInit:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case fetchSuccess:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case fetchFailure:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error()
    }
}

export default loadingReducer