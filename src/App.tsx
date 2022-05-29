import React from 'react';
import './App.module.scss';
import {Flight} from "./components/Flight/Flight";
import {Filtration} from "./components/Filtration/Filtration";
import {useAppSelector} from "./hooks/useReactRedux";
import {FiltrationType} from "./components/Filtration/filtrationReducer";
import s from './App.module.scss'

export const App = React.memo(() => {
    //react-redux
    const filters: FiltrationType[] = useAppSelector(state => state.filtration)

    //action
    const filtration = filters.map(f => <Filtration key={f.id} filterID={f.id} title={f.title} type={f.type}/>)

    return (
        <div className={s.appBlock}>
            <div className={s.filtrationContainer}>
                {filtration}
            </div>
            <div className={s.flightContainer}>
                <Flight/>
                <button>Показать еще</button>
            </div>
        </div>
    );
})

