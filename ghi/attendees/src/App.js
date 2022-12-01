import Nav from "./Nav";
import AttendeesList from "./AttendeesList";
import LocationForm from "./LocationForm";
import ConferenceForm from "./ConferenceForm";
import AttendConferenceForm from "./AttendConferenceForm";
import PresentationForm from "./PresentationForm";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";

function App(props) {
    if (props.attendees === undefined) {
        return null;
    }
    return (
        <BrowserRouter>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="/">
                        <Route path="" element={<MainPage />}></Route>
                    </Route>
                    <Route path="attendees">
                        <Route
                            path="new"
                            element={<AttendConferenceForm />}></Route>
                    </Route>
                    <Route path="conferences">
                        <Route path="new" element={<ConferenceForm />}></Route>
                    </Route>
                    <Route path="locations">
                        <Route path="new" element={<LocationForm />}></Route>
                    </Route>
                    <Route path="attendees">
                        <Route
                            path=""
                            element={
                                <AttendeesList attendees={props.attendees} />
                            }></Route>
                    </Route>
                    <Route path="presentations">
                        <Route
                            path="new"
                            element={<PresentationForm />}></Route>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
