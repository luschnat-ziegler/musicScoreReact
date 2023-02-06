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

export default function StorageInput({data, existingData, formData, setFormData, isConfirmed, setIsConfirmed}) {
    const [isPartOfCompilation, setIsPartOfCompilation] = useState(false)
    const [validationError, setValidationError] = useState("")
    let options = [
        {label: "Bitte Schrank wählen", value: 0}
    ]
    existingData.forEach(item => options.push({label: item.Description, value: item.ID}))
    return (
        <Box direction="column" gap="medium" width="large">
            {!isConfirmed && <CheckBox
                checked={isPartOfCompilation}
                label="Dieses Stück ist Teil einer Zusammenstellung"
                onChange={(event) => setIsPartOfCompilation(event.target.checked)}
            />}
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
        <Card height="small" width="large" background="light-1">
            <CardHeader pad="small" background="status-ok">Folgender Speicherort wurde eingegeben</CardHeader>
            <CardBody pad="medium">
                <Table>
                    <TableBody>
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
                        compilationTitle: null
                    })
                    setIsConfirmed(false)
                }
                }/>
            </CardFooter>
        </Card>
    )
}