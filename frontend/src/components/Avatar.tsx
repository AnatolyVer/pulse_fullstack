import { useState } from 'react';

import { Avatar, AvatarProps, Skeleton } from '@mui/material';

const CustomAvatar = (props: AvatarProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const img = new Image();

    img.src = props.src!;
    img.onload = () => {
        setIsLoading(false);
    }

    return isLoading ? (
        <Skeleton variant="circular" sx={{...props.sx}} />
    ) : (
        <Avatar {...props} src={`${img.src}`} />
    );
};

export default CustomAvatar;
