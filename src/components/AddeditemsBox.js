import {Box, Button, Text} from "grommet";
import React from "react";
import {Close} from "grommet-icons";

export default function AddedItemBox({formData, setFormData, type}) {
    return (
        <Box direction="row" pad="small" gap="small" height={{min: "xxsmall"}} fill="horizontal" round="6px"
             border={{
                 color: "grey",
                 size: "small",
                 side: "all"
             }}>
            {getItems(type, formData, setFormData)}
        </Box>
    )
}

function getItems(type, formData, setFormData) {
    if (type === "composer") {
        return formData.composers.map(composerItem => <Item key={composerItem.id} itemData={composerItem}
                                                            formData={formData} setFormData={setFormData} type={type}/>)
    }
    if (type === "tag") {
        return formData.tags.map(tagItem => <Item key={tagItem.id} itemData={tagItem} formData={formData}
                                                  setFormData={setFormData} type={type}/>)
    }
}

function Item({itemData, formData, setFormData, type}) {
    return (
        <Box pad={{left: "small"}} align="center" background="accent-4" fill={false} round="6px" direction="row">
            <Text>{getText(itemData, type)}</Text>
            <Button icon={<Close size="16px"/>} onClick={getOnClickCallback(type, formData, setFormData, itemData)}/>
        </Box>
    )
}

function getText(itemData, type) {
    if (type === "composer") {
        return itemData.firstName + " " + itemData.lastName
    }
    if (type === "tag") {
        return itemData.content
    }
}

function getOnClickCallback(type, formData, setFormData, itemData) {
    return () => {
        const index = formData.composers.findIndex(item => item.id === itemData.id)
        let previousData = getPreviousData(type, formData)
        previousData.splice(index, 1)
        setFormData({
            ...formData,
            [getUpdateKey(type)]: previousData
        })
    }
}

function getPreviousData(type, formData) {
    if (type === "composer") {
        return formData.composers
    }
    if (type === "tag") {
        return formData.tags
    }
}

function getUpdateKey(type) {
    if (type === "composer") {
        return "composers"
    }
    if (type === "tag") {
        return "tags"
    }
}