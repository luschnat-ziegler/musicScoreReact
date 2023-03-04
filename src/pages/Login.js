import {Box, Button, Spinner, Text, TextInput} from "grommet";
import React, {useReducer, useState} from "react";
import postingReducer from "../reducer/postingReducer";
import {postFailure, postInit, postSuccess} from "../actions/postingActions";
import logInUser from "../services/LogInUser";
import {saveToken} from "../services/TokenStorage";
import {useNavigate} from "react-router-dom";

export default function Login({dataChange, setDataChange}) {
    const navigate = useNavigate()
    const [loginStatus, dispatchLoginStatus] = useReducer(postingReducer, {
        isPosting: false,
        isError: false,
    })
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    })
    return (
        <Box pad="medium" align="center" gap="small" direction="column">
            <Text>Anmeldung</Text>
            {loginStatus.isPosting ? <Spinner size="medium"/> :
                <Box align="center" direction="column" gap="small">
                    {loginStatus.isError && <Text>Ein Fehler ist aufgetreten</Text>}
                    <TextInput
                        placeholder="Username"
                        value={loginData.userName}
                        onChange={(event) => setLoginData({...loginData, userName: event.target.value})}
                    />
                    <TextInput
                        placeholder="Password"
                        type="password"
                        value={loginData.password}
                        onChange={(event) => setLoginData({...loginData, password: event.target.value})}
                    />
                    <Button primary label="Anmelden" onClick={() => {
                        dispatchLoginStatus({type: postInit})
                        logInUser({userName: loginData.userName, password: loginData.password}).then(data => {
                            if (data.token !== undefined) {
                                saveToken(data.token)
                                dispatchLoginStatus({type: postSuccess})
                                setDataChange(!dataChange)
                                navigate("/")
                            } else {
                                dispatchLoginStatus({type: postFailure})
                            }
                        })
                    }}/>
                </Box>}
        </Box>
    )
}
