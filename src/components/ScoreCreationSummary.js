import {Text, Box} from "grommet";
import {StatusCritical, StatusGood} from 'grommet-icons';
import AddedItemBox from "./AddeditemsBox";
import {Button} from "grommet/es6";

const boxes = ["title", "composer", "category", "tag", "storageLocation"]

export default function ScoreCreationSummary({formData, storageDivisionConfirmed, submitCallback}) {
    return (
        <Box direction="column" gap="medium" width="large">
            {boxes.map(boxTitle => <SummaryBox key={boxTitle} type={boxTitle} formData={formData}
                                               confirmed={boxTitle === "storageLocation" ? storageDivisionConfirmed : false}/>)}
            <Button primary label="Absenden" onClick={submitCallback}/>
        </Box>
    )
}

function SummaryBox({type, formData, confirmed}) {
    const isComplete = getIsComplete(type, formData, confirmed)
    return (
        <Box gap="medium" round="6px" border={{color: "black"}} direction="column" pad="medium">
            <Text weight="bold" size="large">{getTitle(type)}</Text>
            <Box gap="medium" direction="row" align="center">
                {!isComplete ? <StatusCritical color="status-critical" size="medium"/> :
                    <StatusGood color="status-ok" size="medium"/>}
                <Box>
                    <Content type={type} isComplete={isComplete} formData={formData}/>
                </Box>
            </Box>
        </Box>
    )
}

function Content({type, isComplete, formData}) {
    if (type === "title") {
        return <Text>{isComplete ? formData.title : "Ein Titel ist notwendig. Bitte gib diesen im ersten Tab ein."}</Text>
    }
    if (type === "composer") {
        if (formData.noComposer) {
            return <Text>Keine Angabe</Text>
        }
        if (formData.composers.length !== 0) {
            return <AddedItemBox formData={formData} setFormData={() => {
            }} type={type} isSummaryMode={true}/>
        }
        return <Text>Bitte gib im zweiten Tab einen oder mehrere Komponist*innen ein oder bestätige, dass es keine
            Angabe gibt</Text>
    }
    if (type === "category") {
        return <Text>{isComplete ? (formData.category === 1 ? "Religiös" : "Weltlich") : "Bitte wähle im dritten Tab eine Kategorie."}</Text>
    }
    if (type === "tag") {
        return (formData.tags.length === 0 ? "Keine Angaben" : <AddedItemBox formData={formData} setFormData={() => {
        }} type={type} isSummaryMode={true}/>)
    }
    if (type === "storageLocation") {
        return <Text>{isComplete ? (formData.storageDivisionName + ", Fach " + formData.storageSubDivision + (formData.compilationTitle === null ? "" : (", Zusammenstellung: " + formData.compilationTitle))) : "Bitte wähle und bestätige im fünften Tab einen Lagerort"}</Text>
    }
}

function getIsComplete(type, formData, confirmed) {
    if (type === "storageLocation") {
        return confirmed
    }
    if (type === "title") {
        return formData.title !== ""
    }
    if (type === "composer") {
        return formData.noComposer || formData.composers.length > 0
    }
    if (type === "category") {
        return formData.category !== 0
    }
    return true
}

export function getAllComplete(formData, storageConfirmed) {
    let isOk = true
    boxes.forEach(box => {
        if (!getIsComplete(box, formData, storageConfirmed)) {
            isOk = false
        }
    })
    return isOk
}

function getTitle(type) {
    if (type === "title") {
        return "Titel"
    }
    if (type === "composer") {
        return "Komponist*innen"
    }
    if (type === "category") {
        return "Kategorie"
    }
    if (type === "tag") {
        return "Tags"
    }
    if (type === "storageLocation") {
        return "Lagerort"
    }
}