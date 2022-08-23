import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const BasicTooltip: React.FC<BasicTooltipPropsType> = ({title, children, onClickHandler}) => {
    return (
        <Tooltip title={title}>
            <IconButton onClick={onClickHandler}>
                {children}
            </IconButton>
        </Tooltip>
    );
}

type BasicTooltipPropsType = {
    title: string
    children: React.ReactNode
    onClickHandler?: () => void
}