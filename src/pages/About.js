import {Box, Heading, Text} from "grommet";

export default function About() {
    return (
        <Box pad="medium" align="left" gap="small" direction="column">
            <Heading>Impressum</Heading>
            <Text>Anbieter dieser Website ist:</Text>
            <Text>Dr. Marian Ziegler</Text>
            <Text>Zum Wäldchen 5</Text>
            <Text>36145 Hofbieber</Text>
            <Text>Tel.: 0176 96667989</Text>
            <Text>Mail: marian@luschnat.de</Text>
            <Text>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV: Dr. Marian Ziegler</Text>
        </Box>
    )
}