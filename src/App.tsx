import React, {useCallback, useEffect, useState} from 'react';
import './App.module.scss';
import {Flight} from './components/Flight/Flight';
import {Filtration} from './components/Filtration/Filtration';
import {useAppDispatch, useAppSelector} from './hooks/useReactRedux';
import {FiltrationType} from './components/Filtration/filtrationReducer';
import s from './App.module.scss'
import {getFlights} from './components/Flight/flightDataReducer';
import {FlightState} from "./components/Flight/flightReducer";

export const App = React.memo(() => {
    //react-redux
    const filters: FiltrationType[] = useAppSelector(state => state.filtration)
    const dispatch = useAppDispatch()
    const flights: FlightState[] = useAppSelector(state => state.flight)
    //hooks
    const [count, setCount] = useState<number>(2)
    useEffect(() => {
        dispatch(getFlights(count))
    }, [count])
    //callbacks
    const increaseCounter = useCallback(() => {
        setCount(count + 2)
    }, [count])
    const decrementCounter = useCallback(() => {
        if (count > 2) {
            setCount(count - 2)
        }
    }, [count])
    //action
    const filtration = filters.map(f => <Filtration key={f.id} filterID={f.id} title={f.title} type={f.type}
                                                    count={count}/>)
    const flight = flights.map(f => <Flight key={f.id} id={f.id}/>)

    return (
        <div className={s.appBlock}>
            <div className={s.filtrationContainer}>
                {filtration}
            </div>
            <div className={s.flightContainer}>
                {flight}
                <button onClick={increaseCounter} className={s.button}>Показать еще</button>
                <button disabled={count === 2}
                        onClick={decrementCounter}
                        className={s.button}
                >
                    Назад
                </button>
            </div>
        </div>
    );
})

