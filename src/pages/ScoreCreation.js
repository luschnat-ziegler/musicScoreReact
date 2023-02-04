import {Box, Tab, Tabs} from "grommet";
import TitleInput from "../components/TitleInput";
import {useState} from "react";
import ComposerInput from "../components/ComposerInput";
import CategoryInput from "../components/CategoryInput";

export default function ScoreCreation({data, dataChange, setDataChange}) {
    const [formData, setFormData] = useState({
        title: "",
        composers: [],
        category: 0
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
                    <Box pad="medium">
                        <ComposerInput data={data} formData={formData} setFormData={setFormData} dataChange={dataChange}
                                       setDataChange={setDataChange}/>
                    </Box>
                </Tab>
                <Tab title="Kategorie">
                    <Box pad="medium">
                        <CategoryInput formData={formData} setFormData={setFormData} dataChange={dataChange}/>
                    </Box>
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