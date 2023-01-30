import {Box, Card, CardBody, CardFooter, CardHeader, Text, TextInput} from "grommet";
import DataTable from "react-data-table-component";
import React from "react";
import {tColumns} from "../pages/ScoreList";

export default function TitleInput({data, formData, setFormData}) {
    const filteredItems = data.filter(item => item.Title && item.Title.toLowerCase() === formData.title.toLowerCase())
    return (
        <Box direction="column" gap="medium" width="large">
            <TextInput
                placeholder="Titel"
                value={formData.title}
                onChange={(event) => setFormData({...formData, title: event.target.value})}
            />
            {filteredItems.length > 0 && <SuggestionList data={filteredItems}/>}
        </Box>
    )
}

export function SuggestionList({data}) {
    return (
        <Card width="large" background="light-1">
            <CardHeader pad="medium" background="accent-1">Haben wir da nicht schon was?</CardHeader>
            <CardBody pad="medium">
                <DataTable columns={tColumns} data={data}/>
            </CardBody>
        </Card>
    )
}