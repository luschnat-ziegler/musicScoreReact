import {Box, Tab, Tabs} from "grommet";
import TitleInput from "../components/TitleInput";
import {useEffect, useReducer, useState} from "react";
import ComposerInput from "../components/ComposerInput";
import CategoryInput from "../components/CategoryInput";
import TagInput from "../components/TagInput";
import StorageInput from "../components/StorageInput";
import loadingReducer from "../reducer/loadingReducer";
import getSuggestionData from "../services/GetSuggestionData";
import {fetchFailure, fetchSuccess} from "../actions/loadingActions";

export default function ScoreCreation({data, dataChange, setDataChange}) {
    const [suggestionData, dispatchSuggestionData] = useReducer(loadingReducer, {
        data: [],
        isLoading: false,
        isError: false,
    })

    const [formData, setFormData] = useState({
        title: "",
        composers: [],
        category: 0,
        tags: [],
        storageDivision: 0,
        storageSubDivision: "",
        compilationId: null,
        compilationTitle: null
    })
    const [storageDivisionConfirmed, setStorageDivisionConfirmed] = useState(false)

    useEffect(() => {
        getSuggestionData().then(result => {
            dispatchSuggestionData({
                type: fetchSuccess,
                payload: result,
            })
        }).catch(() => dispatchSuggestionData({type: fetchFailure}))
    }, [dataChange])

    return (
        <Box pad="medium" align="center">
            <Tabs>
                <Tab title="Titel">
                    <Box pad="medium">
                        <TitleInput data={data} formData={formData} setFormData={setFormData}/>
                    </Box>
                </Tab>
                <Tab title="Komponist(en)">
                    <Box pad="medium">
                        <ComposerInput formData={formData} setFormData={setFormData}
                                       existingData={suggestionData.data[0]}/>
                    </Box>
                </Tab>
                <Tab title="Kategorie">
                    <Box pad="medium">
                        <CategoryInput formData={formData} setFormData={setFormData}
                                       existingData={suggestionData.data[1]}/>
                    </Box>
                </Tab>
                <Tab title="Tags">
                    <Box pad="medium">
                        <TagInput formData={formData} setFormData={setFormData} existingData={suggestionData.data[2]}/>
                    </Box>
                </Tab>
                <Tab title="Lagerort">
                    <Box pad="medium">
                        <StorageInput data={data} existingData={suggestionData.data[3]} formData={formData}
                                      setFormData={setFormData} isConfirmed={storageDivisionConfirmed}
                                      setIsConfirmed={setStorageDivisionConfirmed}/>
                    </Box>
                </Tab>
                <Tab title="Zusammenfassung">
                    <Box pad="medium">
                        Zusammenfassung
                    </Box>
                </Tab>
            </Tabs>
        </Box>
    )
}