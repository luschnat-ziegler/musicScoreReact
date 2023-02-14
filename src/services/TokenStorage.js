import jwtDecode from "jwt-decode";

const saveToken = (tokenValue) => {
    localStorage.setItem('token', tokenValue)
}

const loadToken = () => {
    return localStorage.getItem('token')
}

const deleteToken = () => {
    localStorage.removeItem('token')
}

const checkValid = (token = null) => {
    if (token === null) {
        token = loadToken()
        if (token === null) {
            return false
        }
    }
    try {
        const decodedToken = jwtDecode(token)
        return (decodedToken.exp ?? 0) > Math.floor(Date.now() / 1000)
    } catch (err) {
        return false
    }
}

export {saveToken, loadToken, deleteToken, checkValid}