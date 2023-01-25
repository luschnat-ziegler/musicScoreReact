import React from 'react';
import {Page, Document, StyleSheet, pdf} from '@react-pdf/renderer';
import Table from "./Table";
import * as FileSaver from "file-saver";

const styles = StyleSheet.create({
    page: {
        fontSize: 12,
        flexDirection: "column",
        padding: 50
    },
});

// Create Document Component
export default function PdfFile({data}) {
    return (<Document>
        <Page size="A4" style={styles.page}>
            <Table data={data}/>
        </Page>
    </Document>)
}

export const generatePdfDocument = async (fileName, data) => {
    const blob = await pdf(
        <PdfFile data={data}/>
    ).toBlob();
    FileSaver.saveAs(blob, fileName);
};

