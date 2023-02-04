import {Box, Button, RadioButtonGroup, Text, TextInput} from "grommet";
import React, {useEffect, useReducer, useState} from "react";
import {Close} from 'grommet-icons';
import {v4 as uuidv4} from 'uuid';
import loadingReducer from "../reducer/loadingReducer";
import getComposers from "../services/GetComposers";
import {fetchFailure, fetchSuccess} from "../actions/loadingActions";

export default function ComposerInput({data, formData, setFormData, dataChange, setDataChange}) {
    const [currentComposerData, setCurrentComposerData] = useState({
        firstName: "",
        lastName: ""
    })
    const items = formData.composers.map(composerItem => <Item key={composerItem.id} itemData={composerItem}
                                                               formData={formData} setFormData={setFormData}/>)
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
                <SuggestionList filteredComposers={filteredComposers} formData={formData} setFormData={setFormData}
                                currentComposerData={currentComposerData}
                                setCurrentComposerData={setCurrentComposerData}/> :
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
            <Box direction="row" pad="small" gap="small" height={{min: "xxsmall"}} fill="horizontal" round="6px"
                 border={{
                     color: "grey",
                     size: "small",
                     side: "all"
                 }}>
                {items}
            </Box>
        </Box>
    )
}

function SuggestionList({filteredComposers, formData, setFormData, currentComposerData, setCurrentComposerData}) {
    const [value, setValue] = useState('');
    let optionsList = [{value: "0", label: "Bitte Komponist*in neu anlegen"}]
    filteredComposers.forEach(composer => {
        optionsList.push({value: String(composer.ID), label: composer.FirstName + " " + composer.LastName})
    })
    return (
        <Box gap="small">
            <RadioButtonGroup
                name="doc"
                options={optionsList}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
            />
            <Button primary label="Hinzufügen" onClick={() => {
                if (value === "") {
                    return
                }
                const addedComposer = value !== "0" ? filteredComposers.find(composer => String(composer.ID) === value) : {
                    ID: uuidv4(),
                    FirstName: currentComposerData.firstName,
                    LastName: currentComposerData.lastName
                }
                let previousComposerData = formData.composers
                previousComposerData.push({
                    firstName: addedComposer.FirstName,
                    lastName: addedComposer.LastName,
                    id: addedComposer.ID
                })
                setFormData({...formData, composers: previousComposerData})
                setCurrentComposerData({
                    firstName: "",
                    lastName: ""
                })
            }
            }/>
        </Box>
    )
}

function Item({itemData, formData, setFormData}) {
    return (
        <Box pad={{left: "small"}} align="center" background="accent-4" fill={false} round="6px" direction="row">
            <Text>{itemData.firstName + " " + itemData.lastName}</Text>
            <Button icon={<Close size="16px"/>} onClick={() => {
                const index = formData.composers.findIndex(item => item.id === itemData.id)
                let previousComposerData = formData.composers
                previousComposerData.splice(index, 1)
                setFormData({
                    ...formData,
                    composers: previousComposerData
                })
            }}/>
        </Box>
    )
}