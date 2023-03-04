import {getHeader} from "./GetScores";

export default function getSuggestionData(apiFetch = fetch) {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

    const composerPromise = apiFetch(`${apiBaseUrl}/composers`, getHeader()).then((result) => result.json())
    const categoryPromise = apiFetch(`${apiBaseUrl}/categories`, getHeader()).then((result) => result.json())
    const tagPromise = apiFetch(`${apiBaseUrl}/tags`, getHeader()).then((result) => result.json())
    const storageDivisionPromise = apiFetch(`${apiBaseUrl}/divisions`, getHeader()).then((result) => result.json())
    const compilationPromise = apiFetch(`${apiBaseUrl}/compilations`, getHeader()).then((result) => result.json())

    return Promise.all([composerPromise, categoryPromise, tagPromise, storageDivisionPromise, compilationPromise])
}