import React from 'react';
import './App.css';
import {Flight} from "./components/Flight/Flight";
import {SortingPanel} from "./components/SortingPanel/SortingPanel";

export const App = React.memo(() => {
    return (
        <div>
            <SortingPanel/>
            <Flight/>
        </div>
    );
})

