import {SxProps} from "@mui/material";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export const stringAvatar = (name: string, sx: SxProps<any> & { height?: string }) => {
    if (name){
        return {
            sx: {
                ...(sx),
                bgcolor: stringToColor(name),
                fontSize:`calc(${sx!.height} / 2)`
            },
            children: `${name.toUpperCase()[0]}`,
        };
    }
}