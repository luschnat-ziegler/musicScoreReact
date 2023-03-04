import {Box, Spinner, Tab, Tabs} from "grommet";
import TitleInput from "../components/TitleInput";
import {useEffect, useReducer, useState} from "react";
import ComposerInput from "../components/ComposerInput";
import CategoryInput from "../components/CategoryInput";
import TagInput from "../components/TagInput";
import StorageInput from "../components/StorageInput";
import loadingReducer from "../reducer/loadingReducer";
import getSuggestionData from "../services/GetSuggestionData";
import {fetchFailure, fetchSuccess} from "../actions/loadingActions";
import ScoreCreationSummary, {getAllComplete} from "../components/ScoreCreationSummary";
import postingReducer from "../reducer/postingReducer";
import submitScore from "../services/SubmitScore";
import {postFailure, postInit, postSuccess} from "../actions/postingActions";

const defaultFormData = {
    title: "",
    noComposer: false,
    composers: [],
    category: 0,
    tags: [],
    storageDivision: 0,
    storageDivisionName: "",
    storageSubDivision: "",
    compilationId: null,
    compilationTitle: null
}

export default function ScoreCreation({data, dataChange, setDataChange}) {
    const [suggestionData, dispatchSuggestionData] = useReducer(loadingReducer, {
        data: [],
        isLoading: false,
        isError: false,
    })

    const [submissionStatus, dispatchSubmissionStatus] = useReducer(postingReducer, {
        isPosting: false,
        isError: false,
    })

    const [formData, setFormData] = useState(defaultFormData)
    const [storageDivisionConfirmed, setStorageDivisionConfirmed] = useState(false)

    useEffect(() => {
        getSuggestionData().then(result => {
            dispatchSuggestionData({
                type: fetchSuccess,
                payload: result,
            })
        }).catch(() => dispatchSuggestionData({type: fetchFailure}))
    }, [dataChange])

    const submitCallback = () => {
        if (!getAllComplete(formData, storageDivisionConfirmed)) {
            return
        }
        dispatchSubmissionStatus({type: postInit})
        submitScore(formData).then(response => {
            if (response.id !== undefined) {
                setDataChange(!dataChange)
                setFormData(defaultFormData)
                dispatchSubmissionStatus({type: postSuccess})
            } else {
                dispatchSubmissionStatus({type: postFailure})
            }
        })
    }

    return (
        <Box pad="medium" align="center">
            {submissionStatus.isPosting || suggestionData.isLoading ? <Spinner size="medium"/> :
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
                            <TagInput formData={formData} setFormData={setFormData}
                                      existingData={suggestionData.data[2]}/>
                        </Box>
                    </Tab>
                    <Tab title="Lagerort">
                        <Box pad="medium">
                            <StorageInput data={data} existingData={suggestionData.data[3]} formData={formData}
                                          setFormData={setFormData} isConfirmed={storageDivisionConfirmed}
                                          setIsConfirmed={setStorageDivisionConfirmed}
                                          compilationData={suggestionData.data[4]}/>
                        </Box>
                    </Tab>
                    <Tab title="Zusammenfassung">
                        <Box pad="medium">
                            <ScoreCreationSummary formData={formData}
                                                  storageDivisionConfirmed={storageDivisionConfirmed}
                                                  submitCallback={submitCallback}/>
                        </Box>
                    </Tab>
                </Tabs>}
        </Box>
    )
}