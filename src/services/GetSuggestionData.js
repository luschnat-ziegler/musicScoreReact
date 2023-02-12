export default function getSuggestionData(apiFetch = fetch) {
    const apiBaseUrl = "http://localhost:8080"

    const composerPromise = apiFetch(`${apiBaseUrl}/composers`).then((result) => result.json())
    const categoryPromise = apiFetch(`${apiBaseUrl}/categories`).then((result) => result.json())
    const tagPromise = apiFetch(`${apiBaseUrl}/tags`).then((result) => result.json())
    const storageDivisionPromise = apiFetch(`${apiBaseUrl}/divisions`).then((result) => result.json())
    const compilationPromise = apiFetch(`${apiBaseUrl}/compilations`).then((result) => result.json())

    return Promise.all([composerPromise, categoryPromise, tagPromise, storageDivisionPromise, compilationPromise])
}