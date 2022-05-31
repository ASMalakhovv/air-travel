import React, {ChangeEvent, HTMLInputTypeAttribute, useEffect, useState} from 'react';
import {useAppDispatch} from "../../../hooks/useReactRedux";
import {changeStatus} from "./filterOptionReducer";

type PropsType = {
    type: HTMLInputTypeAttribute | undefined
    option: string
    className?: string
    status: boolean
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
    const [valueChecked, setValueChecked] = useState(status)
    useEffect(() => {
        setValueChecked(status)
    }, [status])
    //react-redux
    const dispatch = useAppDispatch()
    const classNameOption = className ? className : ""

    //callbacks
    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked
        timeoutID && clearTimeout(timeoutID)
        setValueChecked(status)
        const newTimeoutID: number = +setTimeout(() => {
            dispatch(changeStatus({status, filterOptionID, filterID}));
        }, 1500)
        setTimeoutID(newTimeoutID)
    }


    return (
        <div>
            <label>
                <input type={type}
                       onChange={changeChecked}
                       checked={valueChecked}
                />
                <span>{option}</span>
            </label>
        </div>
    );
});
