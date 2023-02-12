import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CheckBox,
    Select,
    Table, TableBody, TableCell,
    TableRow,
    TextInput
} from "grommet";
import {useState} from "react";
import SuggestionList from "./SuggestionList";

export default function StorageInput({
                                         data,
                                         existingData,
                                         formData,
                                         setFormData,
                                         isConfirmed,
                                         setIsConfirmed,
                                         compilationData
                                     }) {
    const [isPartOfCompilation, setIsPartOfCompilation] = useState(false)
    const [currentCompilationData, setCurrentCompilationData] = useState("")
    const [validationError, setValidationError] = useState("")
    const filteredCompilations = compilationData.filter(item => currentCompilationData.length > 1 && item.Title.toLowerCase().includes(currentCompilationData.toLowerCase()))
    let options = [
        {label: "Bitte Schrank wählen", value: 0}
    ]
    existingData.forEach(item => options.push({label: item.Description, value: item.ID}))
    return (
        <Box direction="column" gap="medium" width="large">
            {!isConfirmed && <CheckBox
                checked={isPartOfCompilation}
                label="Dieses Stück ist Teil einer Zusammenstellung"
                onChange={(event) => {
                    setIsPartOfCompilation(event.target.checked)
                    if (!event.target.checked) {
                        setFormData({
                            ...formData, compilationId: null, compilationTitle: null, storageDivision: 0,
                            storageSubDivision: ""
                        })
                    }
                }}
            />}
            {!isConfirmed && isPartOfCompilation &&
                <TextInput placeholder="Titel der Zusammenstellung" value={currentCompilationData}
                           onChange={(event) => setCurrentCompilationData(event.target.value)}/>}
            {!isConfirmed && isPartOfCompilation && filteredCompilations.length > 0 &&
                <SuggestionList formData={formData} setFormData={setFormData} currentData={currentCompilationData}
                                setCurrentData={setCurrentCompilationData} filteredData={filteredCompilations}
                                type={"compilation"}/>}
            {!isConfirmed && <Select
                options={options}
                value={options.find(item => item.value === formData.storageDivision)}
                onChange={({option}) => {
                    if ((option.value !== 0 && validationError === "Bitte Schrank wählen") || validationError === "Dieser Lagerort ist bereits belegt") {
                        setValidationError("")
                    }
                    setFormData({...formData, storageDivision: option.value})
                }}
            />}
            {!isConfirmed && <TextInput
                placeholder="Fach (nur numerische Werte erlaubt)"
                value={formData.storageSubDivision}
                onChange={(event) => {
                    if (!isNaN(event.target.value)) {
                        setFormData({...formData, storageSubDivision: event.target.value})
                        if (validationError === "Dieser Lagerort ist bereits belegt" || validationError === "Bitte Fach wählen") {
                            setValidationError("")
                        }
                    }
                }}
            />}
            {!isConfirmed && <Button primary label="Lagerort bestätigen" onClick={() => {
                if (formData.storageDivision === 0) {
                    setValidationError("Bitte Schrank wählen")
                    return
                }
                if (formData.storageSubDivision === "") {
                    setValidationError("Bitte Fach wählen")
                    return
                }
                if (checkIfOccupied(formData.storageDivision, formData.storageSubDivision, data)) {
                    setValidationError("Dieser Lagerort ist bereits belegt")
                    return
                }
                setFormData({...formData, storageDivisionName: options.find(item => item.value === formData.storageDivision).label})
                setIsConfirmed(true)
            }
            }/>}
            {!isConfirmed && validationError !== "" && <Box round="6px" background="status-error" pad="small">
                {validationError}
            </Box>}
            {isConfirmed && <ConfirmedInfoBox formData={formData} optionsMap={options} setIsConfirmed={setIsConfirmed}
                                              setFormData={setFormData}/>}
        </Box>
    )
}

function checkIfOccupied(divisionId, subdivision, scoreData) {
    return scoreData.find(item => item.StorageDivisionID === divisionId && item.StorageSubDivision === parseInt(subdivision)) !== undefined
}

function ConfirmedInfoBox({formData, optionsMap, setIsConfirmed, setFormData}) {
    const divisionItem = optionsMap.find(item => item.value === formData.storageDivision)
    return (
        <Card height="medium" width="large" background="light-1">
            <CardHeader pad="small" background="status-ok">Folgender Speicherort wurde eingegeben</CardHeader>
            <CardBody pad="medium">
                <Table>
                    <TableBody>
                        {formData.compilationTitle !== null && <TableRow>
                            <TableCell>
                                Zusammenstellung:
                            </TableCell>
                            <TableCell>
                                {formData.compilationTitle}
                            </TableCell>
                        </TableRow>}
                        <TableRow>
                            <TableCell>
                                Ort:
                            </TableCell>
                            <TableCell>
                                {divisionItem !== undefined ? divisionItem.label : ""}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Fach:
                            </TableCell>
                            <TableCell>
                                {formData.storageSubDivision}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardBody>
            <CardFooter pad="small">
                <Button primary label="Zurücksetzen" onClick={() => {
                    setFormData({
                        ...formData, storageDivision: 0,
                        storageSubDivision: "",
                        compilationId: null,
                        compilationTitle: null,
                        storageDivisionName: ""
                    })
                    setIsConfirmed(false)
                }
                }/>
            </CardFooter>
        </Card>
    )
}