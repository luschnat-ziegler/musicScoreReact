import {Box, Button, CheckBox, TextInput} from "grommet";
import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import SuggestionList from "./SuggestionList";
import AddedItemBox from "./AddeditemsBox";

export default function ComposerInput({existingData, formData, setFormData}) {
    const [currentComposerData, setCurrentComposerData] = useState({
        firstName: "",
        lastName: ""
    })
    const filteredComposers = existingData.filter(item => {
        let partialLastMatch = currentComposerData.lastName.length > 1 && item.LastName.toLowerCase().startsWith(currentComposerData.lastName.toLowerCase())
        let partialFirstMatch = currentComposerData.firstName.length > 0 ? item.FirstName.toLowerCase().startsWith(currentComposerData.firstName.toLowerCase()) : true
        return partialLastMatch && partialFirstMatch
    })

    return (
        <Box direction="column" gap="medium" width="large">
            <CheckBox
                checked={formData.noComposer}
                label="Keine Angabe"
                onChange={(event) => {
                    setFormData({...formData, noComposer: event.target.checked})
                }}
            />
            {!formData.noComposer && <TextInput
                placeholder="Nachname"
                value={currentComposerData.lastName}
                onChange={(event) => setCurrentComposerData({...currentComposerData, lastName: event.target.value})}
            />}
            {!formData.noComposer && <TextInput
                placeholder="Vorname"
                value={currentComposerData.firstName}
                onChange={(event) => setCurrentComposerData({...currentComposerData, firstName: event.target.value})}
            />}
            {!formData.noComposer && filteredComposers.length > 0 ?
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
            {!formData.noComposer &&
                <AddedItemBox type={"composer"} formData={formData} setFormData={setFormData} isSummaryMode={false}/>}
        </Box>
    )
}