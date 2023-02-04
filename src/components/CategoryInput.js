import {Box, Select} from "grommet";
import {useEffect, useReducer, useState} from "react";
import loadingReducer from "../reducer/loadingReducer";
import {fetchFailure, fetchSuccess} from "../actions/loadingActions";
import getCategories from "../services/GetCategories";

export default function CategoryInput({formData, setFormData, dataChange}) {
    const [categories, dispatchCategories] = useReducer(loadingReducer, {
        data: [],
        isLoading: false,
        isError: false,
    })
    useEffect(() => {
        getCategories().then((result) => {
            dispatchCategories({
                type: fetchSuccess,
                payload: result,
            })
        }).catch(() => dispatchCategories({type: fetchFailure}))
    }, [dataChange])
    let options = [
        {label: "Bitte wählen", value: 0}
    ]
    categories.data.forEach(item => {
        let translation = item.Name === "religious" ? "religiös" : "weltlich"
        options.push({label: translation, value: item.ID})
    })
    return (
        <Box direction="column" gap="medium" width="large">
            <Select
                options={options}
                value={options.find(item => item.value === formData.category)}
                onChange={({ option }) => setFormData({...formData, category: option.value})}
            />
        </Box>
    )
}