import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor"
import { updateAvatarRequest } from "~/services/API/authAPI";
import PublicIcon from '@mui/icons-material/Public'
import './UpdateAvatar.scss'
import { t } from 'i18next';

export default function UpdateAvatar({ imageFile , modalOpen, setModalOpen, setPreview, mail, setImageFile }) {
    console.log(imageFile , modalOpen)
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);
    const handleSave = async () => {
        if (imageFile) {
            setPreview(URL.createObjectURL(imageFile));
         
            setModalOpen(false);
            
            const res = await updateAvatarRequest(imageFile, mail, accessToken)
            setUserCurrent(res.data)
        }
    };
    const handleCancel =() =>{
        setImageFile(null)
        setModalOpen(false)
    }
    return (
        <Modal open={modalOpen} className="modal-update-avatar">
            <Box className='paper box-update-avatar'>
                <header>{t('title.selectAvatar')}</header>
                <AvatarEditor
                    className="avatar-editor"
                    ref={cropRef}
                    borderRadius={100}
                    scale={slideValue / 10}
                    rotate={0}
                    image={imageFile}
                 
                />
                <Slider className="silder"
                    min={10}
                    max={50}
                    defaultValue={slideValue}
                    value={slideValue}
                    onChange={(e) => setSlideValue(e.target.value)}
                />
                <hr className="divider"></hr>
                <p> <PublicIcon/>{t('common.publicAvatar')}</p>
                <Box>
                    <Button className="button cancel"
                        variant="outlined"
                        onClick={handleCancel}
                    >
                       {t('common.cancel')}
                    </Button>
                    <Button  className="button save"
                        variant="contained"
                        onClick={handleSave}
                    >
                        {t('common.save')}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

