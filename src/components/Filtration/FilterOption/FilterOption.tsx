import React, {HTMLInputTypeAttribute} from 'react';

type PropsType = {
    type: HTMLInputTypeAttribute | undefined
    option: string
    className?: string
    status: boolean
}

export const FilterOption = React.memo(({type, option, className, status, ...props}: PropsType) => {

    const classNameOption = className ? className : ""

    return (
        <div>
            <label>
                <input type={type} onChange={() => {
                }}
                       checked={status}
                />
                <span>{option}</span>
            </label>
        </div>
    );
});
