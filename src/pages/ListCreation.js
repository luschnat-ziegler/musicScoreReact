import {Button} from "grommet";
import {generatePdfDocument} from "../components/PdfFile";

export default function ListCreation({data}) {
    return <Button primary alignSelf="start" label="PDF erstellen" onClick={async () => {
        await generatePdfDocument("Example", data);
    }}/>
}