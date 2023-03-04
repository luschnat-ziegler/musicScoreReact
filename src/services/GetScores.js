import {loadToken} from "./TokenStorage";

export default function getScores(apiFetch = fetch) {
    return apiFetch(`${process.env.REACT_APP_API_BASE_URL}/scores`, getHeader()).then((response) => response.json())
}

export function getHeader() {
    return {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        }
    }
}