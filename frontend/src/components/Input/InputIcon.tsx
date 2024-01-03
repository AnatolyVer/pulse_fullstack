import EyeSwitcher from "@components/Input/EyeSwitcher/EyeSwitcher.tsx";
import {TInputType} from "@shared/interfaces/TInputType.ts";

interface InputIconProps{
    inputType: TInputType
    isVisible:boolean
    showValue: () => void
}

const InputIcon = ({inputType, isVisible, showValue}:InputIconProps) => {
    switch (inputType) {
        case "password":
            return <EyeSwitcher visible={isVisible} onClick={showValue}/>
        case "text":
            return <></>
    }
};

export default InputIcon;