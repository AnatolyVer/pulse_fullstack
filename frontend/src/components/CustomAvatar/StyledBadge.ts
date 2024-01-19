import {Badge, styled} from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#FFFFFF',
        color: '#FFFFFF',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        animation: 'pulse 1.2s infinite ease-in-out',
        position: 'absolute',
        bottom: "10%",
        right: "10%",
    },
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(1.2)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}));