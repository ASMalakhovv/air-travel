import React from 'react';
import {Sorting} from "./Sorting/Sorting";
import {Filtration} from './Filtration/Filtration';
import {Airlines} from './Airlines/Airlines';
import {Prices} from './Prices/Prices';
import s from './SortingPanel.module.scss'

export const SortingPanel = React.memo(() => {
    return (
        <div className={s.sortingPanelBlock}>
            <Sorting/>
            <Filtration/>
            <Prices/>
            <Airlines/>
        </div>
    );
});
