import {Box, Button, TextInput} from "grommet";
import React, {useEffect, useReducer, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import loadingReducer from "../reducer/loadingReducer";
import getComposers from "../services/GetComposers";
import {fetchFailure, fetchSuccess} from "../actions/loadingActions";
import SuggestionList from "./SuggestionList";
import AddedItemBox from "./AddeditemsBox";

export default function ComposerInput({data, formData, setFormData, dataChange, setDataChange}) {
    const [currentComposerData, setCurrentComposerData] = useState({
        firstName: "",
        lastName: ""
    })
    const [composers, dispatchComposers] = useReducer(loadingReducer, {
        data: [],
        isLoading: false,
        isError: false,
    })
    const filteredComposers = composers.data.filter(item => {
        let partialLastMatch = currentComposerData.lastName.length > 1 && item.LastName.toLowerCase().startsWith(currentComposerData.lastName.toLowerCase())
        let partialFirstMatch = currentComposerData.firstName.length > 0 ? item.FirstName.toLowerCase().startsWith(currentComposerData.firstName.toLowerCase()) : true
        return partialLastMatch && partialFirstMatch
    })

    useEffect(() => {
        getComposers().then((result) => {
            dispatchComposers({
                type: fetchSuccess,
                payload: result,
            })
        }).catch(() => dispatchComposers({type: fetchFailure}))
    }, [dataChange])

    return (
        <Box direction="column" gap="medium" width="large">
            <TextInput
                placeholder="Nachname"
                value={currentComposerData.lastName}
                onChange={(event) => setCurrentComposerData({...currentComposerData, lastName: event.target.value})}
            />
            <TextInput
                placeholder="Vorname"
                value={currentComposerData.firstName}
                onChange={(event) => setCurrentComposerData({...currentComposerData, firstName: event.target.value})}
            />
            {filteredComposers.length > 0 ?
                <SuggestionList filteredData={filteredComposers} formData={formData} setFormData={setFormData}
                                currentData={currentComposerData}
                                setCurrentData={setCurrentComposerData} type={"composer"}/> :
                (currentComposerData.lastName !== "" && <Button primary label="Hinzufügen" onClick={() => {
                    let previousComposerData = formData.composers
                    previousComposerData.push({
                        firstName: currentComposerData.firstName,
                        lastName: currentComposerData.lastName,
                        id: uuidv4()
                    })
                    setFormData({...formData, composers: previousComposerData})
                    setCurrentComposerData({
                        firstName: "",
                        lastName: ""
                    })
                }
                }/>)}
            <AddedItemBox type={"composer"} formData={formData} setFormData={setFormData}/>
        </Box>
    )
}