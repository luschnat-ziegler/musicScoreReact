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
}

function Item({itemData, formData, setFormData, type}) {
    return (
        <Box pad={{left: "small"}} align="center" background="accent-4" fill={false} round="6px" direction="row">
            <Text>{itemData.firstName + " " + itemData.lastName}</Text>
            <Button icon={<Close size="16px"/>} onClick={getOnClickCallback(type, formData, setFormData, itemData)}/>
        </Box>
    )
}

function getOnClickCallback(type, formData, setFormData, itemData) {
    console.log(formData)
    if (type === "composer") {
        return () => {
            const index = formData.composers.findIndex(item => item.id === itemData.id)
            let previousComposerData = formData.composers
            previousComposerData.splice(index, 1)
            setFormData({
                ...formData,
                composers: previousComposerData
            })
        }
    }
}