export default function getCategories(apiFetch = fetch) {
    const apiBaseUrl = "http://localhost:8080"
    return apiFetch(`${apiBaseUrl}/categories`).then((response) => response.json())
}