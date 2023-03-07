import {
    Footer,
    Grommet, Main,
    Page,
    PageContent,
} from 'grommet';
import {Collapsable} from "./components/CollapsableNav";
import getScores from "./services/GetScores";
import {useEffect, useReducer, useState} from "react";
import loadingReducer from "./reducer/loadingReducer";
import {fetchFailure, fetchSuccess} from "./actions/loadingActions";
import {sortAbc} from "./services/TransformData";
import {Navigate, Route, Routes} from "react-router-dom";
import ScoreList from "./pages/ScoreList";
import ListCreation from "./pages/ListCreation";
import ScoreCreation from "./pages/ScoreCreation";
import Login from "./pages/Login";
import {checkValid} from "./services/TokenStorage";
import About from "./pages/About";
import {StyledLink} from "./components/StyledLink";

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

    const [dataChange, setDataChange] = useState(true)
    const hasValidToken = checkValid()

    useEffect(() => {
        if (hasValidToken) {
            getScores().then((result) => {
                result = sortAbc(result)
                dispatchScores({
                    type: fetchSuccess,
                    payload: result,
                })
            }).catch(() => dispatchScores({type: fetchFailure}))
        }
    }, [hasValidToken, dataChange])

    return (
        <Grommet theme={theme} full>
            <Collapsable></Collapsable>
            <Main>
                <Page>
                    <PageContent>
                        <Routes>
                            <Route path="/login"
                                   element={<Login dataChange={dataChange} setDataChange={setDataChange}/>}/>
                            <Route path="/pdf" element={hasValidToken ? <ListCreation data={scores.data}/> :
                                <Navigate to={"/login"}/>}/>
                            <Route path="/"
                                   element={hasValidToken ? <ScoreList scoreData={scores}/> :
                                       <Navigate to={"/login"}/>}/>
                            <Route path="/create"
                                   element={hasValidToken ? <ScoreCreation data={scores.data} dataChange={dataChange}
                                                                           setDataChange={setDataChange}/> :
                                       <Navigate to={"/login"}/>}/>
                            <Route path="/about" element={<About/>}/>
                        </Routes>
                    </PageContent>
                </Page>
            </Main>
            <Footer background="neutral-3" pad="medium">
                <StyledLink to="/about">Impressum</StyledLink>
            </Footer>
        </Grommet>
    );
}

export default App;
