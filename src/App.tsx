import React from 'react';
import Navbar from "./components/Layout/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CharacterPage from "./pages/CharacterPage/CharacterPage";

function App() {
    return (

        <main className="container-fluid p-0">
            <BrowserRouter>
                <React.Fragment>
                    <Navbar/>
                </React.Fragment>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/character/:id' element={<CharacterPage/>}/>
                </Routes>
                <React.Fragment>
                    <Navbar/>
                </React.Fragment>
            </BrowserRouter>
        </main>

    )
        ;
}

export default App;
