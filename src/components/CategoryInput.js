import {Box, Select} from "grommet";

export default function CategoryInput({formData, setFormData, existingData}) {
    let options = [
        {label: "Bitte wählen", value: 0}
    ]
    existingData.forEach(item => {
        let translation = item.Name === "religious" ? "religiös" : "weltlich"
        options.push({label: translation, value: item.ID})
    })
    return (
        <Box direction="column" gap="medium" width="large">
            <Select
                options={options}
                value={options.find(item => item.value === formData.category)}
                onChange={({option}) => setFormData({...formData, category: option.value})}
            />
        </Box>
    )
}