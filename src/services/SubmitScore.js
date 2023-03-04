import {loadToken} from "./TokenStorage";

export default function submitScore(data, apiFetch = fetch) {
    delete [data["noComposer"]]
    delete [data["storageDivisionName"]]
    return apiFetch(`${process.env.REACT_APP_API_BASE_URL}/createScore`, {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        },
        method: 'post',
        body: JSON.stringify(data),
    }).then((response) => response.json())
}