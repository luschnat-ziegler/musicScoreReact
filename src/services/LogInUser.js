
export default function logInUser(data, apiFetch = fetch) {
    const apiBaseUrl = "http://localhost:8080"
    return apiFetch(`${apiBaseUrl}/login`, {
        method: 'post',
        body: JSON.stringify(data),
    }).then((response) => response.json())
}