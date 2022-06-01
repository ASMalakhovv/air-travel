import React, {ChangeEvent, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import {useAppDispatch} from '../../../hooks/useReactRedux';
import {changeStatus, changeStatusAirlines, changeStatusInput} from './filterOptionReducer';
import {getFlights} from '../../Flight/flightDataReducer';
import {airlinesID} from '../filtrationReducer';

type PropsType = {
    type: HTMLInputTypeAttribute | undefined
    option: string
    className?: string
    status: boolean | number
    setTimeoutID: (timeoutID: number | null) => void
    timeoutID: number | null
    filterID: string
    filterOptionID: number
    count: number
}

export const FilterOption = React.memo((
    {
        type, option, className, status, setTimeoutID, timeoutID,
        filterID, filterOptionID, count, ...props
    }: PropsType) => {
    //hooks
    const [valueChecked, setValueChecked] = useState(!!status)
    const [inputNumber, setInputNumber] = useState(typeof status === 'number' ? status : 0)
    useEffect(() => {
        setValueChecked(!!status)
    }, [status])
    //react-redux
    const dispatch = useAppDispatch()
    //callbacks
    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (filterID === airlinesID) {
            const status = e.currentTarget.checked
            setValueChecked(status)
            timeoutID && clearTimeout(timeoutID)
            const newTimeoutID: number = +setTimeout(() => {
                dispatch(changeStatusAirlines({status, filterOptionID, filterID}));
                dispatch(getFlights(count))
            }, 1500)
            setTimeoutID(newTimeoutID)
        }
        if (e.currentTarget.type === 'number') {
            const status = Number(e.currentTarget.value)
            //установить значение от или до
            setInputNumber(status)
            timeoutID && clearTimeout(timeoutID)
            const newTimeoutID: number = +setTimeout(() => {
                dispatch(changeStatusInput({status, filterOptionID, filterID}));
                dispatch(getFlights(count))
            }, 1500)
            setTimeoutID(newTimeoutID)
        } else {
            const status = e.currentTarget.checked
            setValueChecked(status)
            timeoutID && clearTimeout(timeoutID)
            const newTimeoutID: number = +setTimeout(() => {
                dispatch(changeStatus({status, filterOptionID, filterID}));
                dispatch(getFlights(count))
            }, 1500)
            setTimeoutID(newTimeoutID)
        }
    }

    return (
        <div>
            <label>
                <input type={type}
                       onChange={changeChecked}
                       checked={valueChecked}
                       value={inputNumber}
                />
                <span>{option}</span>
            </label>
        </div>
    );
});
