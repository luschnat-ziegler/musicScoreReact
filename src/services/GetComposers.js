export default function getComposers(apiFetch = fetch) {
    const apiBaseUrl = "http://localhost:8080"
    return apiFetch(`${apiBaseUrl}/composers`).then((response) => response.json())
}