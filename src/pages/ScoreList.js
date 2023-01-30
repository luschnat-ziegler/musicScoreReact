import DataTable from "react-data-table-component";
import {Box, Text, Grid, TextInput, DropButton, Heading, Button, CheckBox} from "grommet";
import React, {useState} from "react";
import styled from "styled-components";
import {Close, FormDown} from "grommet-icons";

const align = {top: 'bottom'};

export const tColumns = [
    {
        name: 'Titel',
        selector: row => row.Title,
        sortable: true,
    },
    {
        name: 'Komponist',
        selector: row => row.ComposerString,
        sortable: true,
    },
    {
        name: 'Lagerort',
        selector: row => row.StorageDivision + ", " + row.StorageSubDivision,
    },
];
export default function ScoreList({data}) {
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [filterOptions, setFilterOptions] = useState({
        title: true,
        composer: false
    })
    const filteredItems = data.filter(
        item => {
            let titleFound = filterOptions.title && item.Title && item.Title.toLowerCase().includes(value.toLowerCase())
            let composerFound = filterOptions.composer && item.ComposerString && item.ComposerString.toLowerCase().includes(value.toLowerCase())
            return composerFound || titleFound
        }
    );
    return (
        <>
            <Grid columns={['2/3', '1/3']} gap="small" pad="medium">
                <TextInput placeholder="Nach Titel filtern"
                           value={value}
                           onChange={event => {
                               setValue(event.target.value)
                           }}
                />
                <DropButton
                    open={open}
                    onClose={onClose}
                    onOpen={onOpen}
                    dropContent={<Box pad="small">
                        <Box direction="row" justify="between" align="center">
                            <Heading level={4} margin="small">
                                Filteroptionen
                            </Heading>
                            <Button icon={<Close/>} onClick={onClose}/>
                        </Box>
                        <CheckBox
                            checked={filterOptions.title}
                            label="Titel"
                            onChange={(event) => {
                                setFilterOptions({
                                    ...filterOptions,
                                    title: event.target.checked
                                })
                            }}
                        />
                        <CheckBox
                            checked={filterOptions.composer}
                            label="Komponist"
                            onChange={(event) => {
                                setFilterOptions({
                                    ...filterOptions,
                                    composer: event.target.checked
                                })
                            }}
                        />
                    </Box>}
                    dropProps={{align}}
                >
                    <Box direction="row" gap="medium" align="center" pad="small">
                        <Text>
                            Optionen
                        </Text>
                        <FormDown color="brand"/>
                    </Box>
                </DropButton>
            </Grid>
            <DataTable columns={tColumns} data={filteredItems} pagination/>
        </>
    )
}

function DropContent({onClose, filterOptions, setFilterOptions}) {
    const [checkedTitle, setCheckedTitle] = useState(filterOptions.title)
    const [checkedComposer, setCheckedComposer] = useState(filterOptions.composer)
    return (<Box pad="small">
        <Box direction="row" justify="between" align="center">
            <Heading level={3} margin="small">
                Heading
            </Heading>
            <Button icon={<Close/>} onClick={onClose}/>
        </Box>
        <Box>
            <CheckBox
                checked={checkedTitle}
                label="Titel"
                onChange={(event) => {
                    setCheckedTitle(event.target.checked)
                    setFilterOptions({
                        ...filterOptions,
                        title: checkedTitle
                    })
                }}
            />
            <CheckBox
                checked={checkedComposer}
                label="Komponist"
                onChange={(event) => {
                    setCheckedComposer(event.target.checked)
                    setFilterOptions({
                        ...filterOptions,
                        composer: checkedComposer
                    })
                    console.log(filterOptions)
                }}
            />
        </Box>
    </Box>)
};