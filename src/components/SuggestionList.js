import React, {useState} from "react";
import {Box, Button, RadioButtonGroup} from "grommet";
import {v4 as uuidv4} from "uuid";

export default function SuggestionList({filteredData, formData, setFormData, currentData, setCurrentData, type}) {
    const [value, setValue] = useState('');
    let optionsList = [{value: "0", label: getNewCreationLabel(type)}]
    filteredData.forEach(item => {
        optionsList.push({value: String(item.ID), label: getLabel(item, type)})
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
                const addedItem = getSelectedItem(type, filteredData, currentData, value)
                let currentFormData = getCurrentFormData(formData, type)
                currentFormData.push(getItemToAdd(addedItem, type))
                setFormData({...formData, ...getDataForFormUpdate(type, currentFormData)})
                setCurrentData(getResetInputObject(type))
            }
            }/>
        </Box>
    )
}

function getLabel(item, type) {
    if (type === "composer") {
        return (item.FirstName + " " + item.LastName)
    }
    if (type === "tag") {
        return item.Content
    }
}

function getNewCreationLabel(type) {
    if (type === "composer") {
        return "Bitte Komponist*in neu anlegen"
    }
    if (type === "tag") {
        return "Bitte Tag neu anlegen"
    }
}

function getSelectedItem(type, filteredData, currentData, value) {
    if (type === "composer") {
        return value !== "0" ? filteredData.find(composer => String(composer.ID) === value) : {
            ID: uuidv4(),
            FirstName: currentData.firstName,
            LastName: currentData.lastName
        }
    }
    if (type === "tag") {
        return value !== "0" ? filteredData.find(tag => String(tag.ID) === value) : {
            ID: uuidv4(),
            Content: currentData
        }
    }
}

function getCurrentFormData(formData, type) {
    if (type === "composer") {
        return formData.composers
    }
    if (type === "tag") {
        return formData.tags
    }
}

function getItemToAdd(addedItem, type) {
    if (type === "composer") {
        return {
            firstName: addedItem.FirstName,
            lastName: addedItem.LastName,
            id: addedItem.ID
        }
    }
    if (type === "tag") {
        return {
            id: addedItem.ID,
            content: addedItem.Content
        }
    }
}

function getDataForFormUpdate(type, updatedFormData) {
    if (type === "composer") {
        return {composers: updatedFormData}
    }
    if (type === "tags") {
        return {tags: updatedFormData}
    }
}

function getResetInputObject(type) {
    if (type === "composer") {
        return {
            firstName: "",
            lastName: ""
        }
    }
    if (type === "tag") {
        return ""
    }
}