import React, {useEffect, useRef, useState} from 'react';

import s from '../../../styles/snackBar.module.scss';

const SnackBar: React.FC<SnackBarType> = ({children}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setIsActive(!isActive);
        }, 3000);
        return () => clearTimeout(timeoutID);
    }, []);

    return (
        <div className={`${s.snackBarWrapper} ${isActive ? s.hide : null}`}>{children}</div>
    );
};
export default SnackBar;

export type SnackBarType = {
    children: string;
};
