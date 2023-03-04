
export default function logInUser(data, apiFetch = fetch) {
    return apiFetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
    }).then((response) => response.json())
}