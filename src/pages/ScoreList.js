import DataTable from "react-data-table-component";
import {TextInput} from "grommet";
import {useState} from "react";
import styled from "styled-components";

const tColumns = [
    {
        name: 'Titel',
        selector: row => row.Title,
        sortable: true,
    },
    {
        name: 'Lagerort',
        selector: row => row.StorageDivision + ", " + row.StorageSubDivision,
    },
];
export default function ScoreList({data}) {
    const [value, setValue] = useState('')
    const filteredItems = data.filter(
        item => item.Title && item.Title.toLowerCase().includes(value.toLowerCase()),
    );
    return (
        <>
            <StyledTextInput placeholder="Nach Titel filtern"
                       value={value}
                       onChange={event => setValue(event.target.value)}
            />
            <DataTable columns={tColumns} data={filteredItems} pagination/>
        </>
    )
}

const StyledTextInput = styled(TextInput)`
  margin-top: 10px;
`;