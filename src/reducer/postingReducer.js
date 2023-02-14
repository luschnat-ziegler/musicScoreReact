import {postInit, postSuccess, postFailure} from '../actions/postingActions'

const postingReducer = (state, action) => {
    switch (action.type) {
        case postInit:
            return {
                ...state,
                isPosting: true,
                isError: false,
            }
        case postSuccess:
            return {
                ...state,
                isPosting: false,
                isError: false,
            }
        case postFailure:
            return {
                ...state,
                isPosting: false,
                isError: true,
            }
        default:
            throw new Error()
    }
}

export default postingReducer