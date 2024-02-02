import React, {useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CropModal from '@components/CropModal/CropModal';
import EditIcon from '@mui/icons-material/Edit';
import classes from './styles.module.scss'
import {IAvatarHook} from "@shared/interfaces/IAvatar.ts";
import {Crop} from "react-image-crop";
import useLoader from "@components/Loader/useLoader.ts";
import Avatar from '@components/CustomAvatar/CustomAvatar.tsx';

interface AvatarUploaderProps{
    avatar:IAvatarHook,
    alt: string
}

function AvatarUploader ({avatar, alt}:AvatarUploaderProps){

    const [open, setOpen] = useState<boolean>(false)
    const [crop, setCrop] = useState<Crop>()

    const [openLoader,] = useLoader()

    useEffect(() => {
        console.log(avatar)
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader();
        let file = e.target.files?.item(0);
        if (file) {
            if (file.type && file.type.startsWith('image/')) {
                openLoader()
                setCrop(undefined)
                setOpen(true)
                reader.onloadend = () => {
                    avatar.uploadImage(file!, reader.result!)
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const display = avatar.avatar.fileToUpload ? 'block' : 'none'

    return (
        <div className={classes.AvatarUploader}>
            <label htmlFor="avatar">
                <Avatar src={`${avatar.avatar.previewPhoto}`} sx={{width: 90, height: 90, cursor:'pointer'}} alt={alt}/>
            </label>
            <input hidden key={Date.now()} type="file" id="avatar" name="avatar" onChange={(e)=> handleImageChange(e)} />
            <CloseIcon sx={{position:"absolute", left:-10, top:0, cursor:'pointer', display:display}} onClick={avatar.setDefaultImage}/>
            <EditIcon sx={{position:"absolute", right:-10, top:2, cursor:'pointer', width:'18px', height:'18px', display:display}} onClick={() => setOpen(true)}/>
            <CropModal open={open} crop={crop} setCrop={setCrop} setOpen={setOpen} photo={avatar} aspect={1}/>
        </div>
    );
}

export default AvatarUploader;
