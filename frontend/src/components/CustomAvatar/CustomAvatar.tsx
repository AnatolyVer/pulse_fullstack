import { useState } from 'react';
import { stringAvatar } from "@components/CustomAvatar/colorBackground.ts";
import { Avatar, AvatarProps, Skeleton} from '@mui/material';
import { StyledBadge } from "@components/CustomAvatar/StyledBadge.ts";

interface CustomAvatarProps extends AvatarProps {
    sx?: any; // Приведение к типу any
    online?: boolean;
    height?: string; // Добавляем опциональное свойство height
}

const CustomAvatar = ({ sx, src, alt, online }: CustomAvatarProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const img = new Image();
    img.src = src!;
    img.onload = () => setIsLoading(false)
    img.onerror = () => setIsLoading(false)

    const avatar = online ? (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
        >
            <Avatar {...stringAvatar(alt!, sx!)} src={`${img.src}`} />
        </StyledBadge>
    ) : (
        <Avatar {...stringAvatar(alt!, sx!)} src={`${img.src}`} />
    )

    return isLoading ? (
        <Skeleton variant="circular" sx={{ ...sx }} />
    ) : (
        avatar
    );
};

export default CustomAvatar;
