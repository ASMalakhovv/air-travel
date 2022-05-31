import React, {ChangeEvent, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import {useAppDispatch} from "../../../hooks/useReactRedux";
import {changeStatus, changeStatusInput} from "./filterOptionReducer";

type PropsType = {
    type: HTMLInputTypeAttribute | undefined
    option: string
    className?: string
    status: boolean | number
    setTimeoutID: (timeoutID: number | null) => void
    timeoutID: number | null
    filterID: string
    filterOptionID: number
}

export const FilterOption = React.memo((
    {
        type, option, className, status, setTimeoutID, timeoutID,
        filterID, filterOptionID, ...props
    }: PropsType) => {
    //hooks
    const [valueChecked, setValueChecked] = useState(!!status)
    const [inputNumber, setInputNumber] = useState(typeof status === 'number' ? status : 0)
    useEffect(() => {
        setValueChecked(!!status)
    }, [status])
    //react-redux
    const dispatch = useAppDispatch()
    const classNameOption = className ? className : ""

    //callbacks
    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        if (e.currentTarget.type === 'number') {
            const status = Number(e.currentTarget.value)
            //установить значение от или до
            setInputNumber(status)
            timeoutID && clearTimeout(timeoutID)
            const newTimeoutID: number = +setTimeout(() => {
                dispatch(changeStatusInput({status, filterOptionID, filterID}));
            }, 1500)
            setTimeoutID(newTimeoutID)
        } else {
            const status = e.currentTarget.checked
            setValueChecked(status)
            timeoutID && clearTimeout(timeoutID)
            const newTimeoutID: number = +setTimeout(() => {
                dispatch(changeStatus({status, filterOptionID, filterID}));
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
