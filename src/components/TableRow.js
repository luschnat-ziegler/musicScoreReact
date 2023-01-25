import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: 2
    },
    description: {
        width: "60%",
    },
    xyz: {
        width: "40%",
    },
});

const TableRow = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.row} key={item.ID}>
            <Text style={styles.description}>{item.Title}</Text>
            <Text style={styles.xyz}>{item.StorageDivision + ", " + item.StorageSubDivision}</Text>
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableRow;