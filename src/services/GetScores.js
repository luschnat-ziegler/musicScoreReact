export default function getScores(apiFetch = fetch) {
    const apiBaseUrl = "http://localhost:8080"
    return apiFetch(`${apiBaseUrl}/scores`, ).then((response) => response.json())
}