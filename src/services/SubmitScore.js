import {loadToken} from "./TokenStorage";
import {validate as uuidValidate} from 'uuid';

export default function submitScore(data, apiFetch = fetch) {
    const submitData = {
        title: data.title,
        composers: data.composers.map(composer => uuidValidate(composer.id) ? {
            firstName: composer.firstName === "" ? null : composer.firstName,
            lastName: composer.lastName
        } : {id: composer.id}),
        tags: data.tags.map(tag => uuidValidate(tag.id) ? {content: tag.content} : {id: tag.id}),
        category: data.category,
        storageDivisionID: data.storageDivision,
        storageSubDivision: data.storageSubDivision === "" ? null : parseInt(data.storageSubDivision),
        compilationID: data.compilationId,
        compilationTitle: data.compilationTitle
    }
    return apiFetch(`${process.env.REACT_APP_API_BASE_URL}/createScore`, {
        headers: {
            Authorization: `Bearer ${loadToken()}`,
        },
        method: 'post',
        body: JSON.stringify(submitData),
    }).then((response) => response.json())
}