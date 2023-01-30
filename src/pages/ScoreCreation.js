import {Box, Tab, Tabs, TextInput} from "grommet";
import TitleInput from "../components/TitleInput";
import {useState} from "react";

export default function ScoreCreation({data}) {
    const [formData, setFormData] = useState({
        title: ""
    })

    return (
        <Box pad="medium" align="center">
            <Tabs>
                <Tab title="Titel">
                    <Box pad="medium">
                        <TitleInput data={data} formData={formData} setFormData={setFormData}/>
                    </Box>
                </Tab>
                <Tab title="Komponist(en)">
                    <Box pad="medium" align="center">Two</Box>
                </Tab>
                <Tab title="Kategorie">
                    <Box pad="medium">Two</Box>
                </Tab>
                <Tab title="Tags">
                    <Box pad="medium">Two</Box>
                </Tab>
                <Tab title="Lagerort">
                    <Box pad="medium">Two</Box>
                </Tab>
            </Tabs>
        </Box>
    )
}