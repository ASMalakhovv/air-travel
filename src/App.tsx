import React, {useEffect} from 'react';
import './App.module.scss';
import {Flight} from "./components/Flight/Flight";
import {Filtration} from "./components/Filtration/Filtration";
import {useAppDispatch, useAppSelector} from "./hooks/useReactRedux";
import {FiltrationType} from "./components/Filtration/filtrationReducer";
import s from './App.module.scss'
import {getFlights} from "./components/Flight/flightDataReducer";
import {FlightState} from "./components/Flight/flightReducer";


export const App = React.memo(() => {
    //react-redux
    const filters: FiltrationType[] = useAppSelector(state => state.filtration)
    const dispatch = useAppDispatch()
    const flights:FlightState[] = useAppSelector(state => state.flight)
    debugger
    //hooks
    useEffect(() => {
        dispatch(getFlights())
    }, [])


    //action
    const filtration = filters.map(f => <Filtration key={f.id} filterID={f.id} title={f.title} type={f.type}/>)
    const flight = flights.map(f => <Flight id={f.id}/>)
    return (
        <div className={s.appBlock}>
            <div className={s.filtrationContainer}>
                {filtration}
            </div>
            <div className={s.flightContainer}>
                {flight}
                <button>Показать еще</button>
            </div>
        </div>
    );
})

