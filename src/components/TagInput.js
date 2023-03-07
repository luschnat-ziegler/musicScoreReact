import React, {useState} from "react";
import {Box, Button, TextInput} from "grommet";
import SuggestionList, {checkDuplication} from "./SuggestionList";
import {v4 as uuidv4} from "uuid";
import AddedItemBox from "./AddeditemsBox";

export default function TagInput({formData, setFormData, existingData}) {
    const [currentTagData, setCurrentTagData] = useState("")
    const filteredTags = existingData.filter(item => currentTagData.length > 1 && item.Content.toLowerCase().includes(currentTagData.toLowerCase()))

    return (
        <Box direction="column" gap="medium" width="large">
            <TextInput
                placeholder="Tag"
                value={currentTagData}
                onChange={(event) => setCurrentTagData(event.target.value)}
            />
            {filteredTags.length > 0 ?
                <SuggestionList filteredData={filteredTags} formData={formData} setFormData={setFormData}
                                currentData={currentTagData}
                                setCurrentData={setCurrentTagData}
                                type={"tag"}/> : (currentTagData !== "" &&
                    <Button primary label="Hinzufügen" onClick={() => {
                        if (checkDuplication(formData, currentTagData, "tag")) {
                            return
                        }
                        let previousTagData = formData.tags
                        previousTagData.push({
                            content: currentTagData,
                            id: uuidv4()
                        })
                        setFormData({...formData, tags: previousTagData})
                        setCurrentTagData("")
                    }
                    }/>)}
            <AddedItemBox type={"tag"} setFormData={setFormData} formData={formData} isSummaryMode={false}/>
        </Box>
    )
}