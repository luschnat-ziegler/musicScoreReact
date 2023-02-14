import {Box, Button, Text, TextInput} from "grommet";
import React, {useState} from "react";

export default function Login() {
    const [loginData, setLoginData] = useState({
        userName: "",
        password: ""
    })
    return (
        <Box pad="medium" align="center" gap="small" direction="column">
            <Text>Anmeldung</Text>
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


            }}/>
        </Box>
    )
}