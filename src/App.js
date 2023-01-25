import {
    Grommet,
    Page,
    PageContent,
} from 'grommet';
import {Collapsable} from "./components/CollapsableNav";
import getScores from "./services/GetScores";
import {useEffect, useReducer, useState} from "react";
import loadingReducer from "./reducer/loadingReducer";
import {fetchFailure, fetchSuccess} from "./actions/loadingActions";
import {sortAbc} from "./services/TransformData";
import {Route, Routes} from "react-router-dom";
import ScoreList from "./pages/ScoreList";
import ListCreation from "./pages/ListCreation";

const theme = {
    global: {
        font: {
            family: "Roboto",
            size: "18px",
            height: "20px",
        },
    }
}

function App() {
    const [scores, dispatchScores] = useReducer(loadingReducer, {
        data: [],
        isLoading: false,
        isError: false,
    })

    const [dataChange, setDataChange] = useState('toggle')

    useEffect(() => {
        getScores().then((result) => {
            result = sortAbc(result)
            dispatchScores({
                type: fetchSuccess,
                payload: result,
            })
        }).catch(() => dispatchScores({type: fetchFailure}))
    }, [dataChange])

    return (
        <Grommet theme={theme} full>
            <Collapsable></Collapsable>
            <Page>
                <PageContent>
                    <Routes>
                        <Route path="/pdf" element={<ListCreation data={scores.data}/>}/>
                        <Route path="/" element={<ScoreList data={scores.data}/>}/>
                    </Routes>
                </PageContent>
            </Page>
        </Grommet>
    );
}

export default App;
