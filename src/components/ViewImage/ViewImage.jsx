import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './ViewImage.scss';
import { t } from 'i18next';

export default function ViewIamge(props) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (props.images.length > 0) {
            setOpen(true);
        }
    }, [props.images]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.setImages([]);
        setOpen(false);
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="md"
            >
                <div className="dialog__imgs paper">
                    <DialogTitle
                        id="alert-dialog-title"
                        style={{ fontSize: '18px', fontWeight: 'bold', width: '600px', marginBottom: '20px' }}
                    >
                        <Button onClick={handleClose} style={{ fontSize: '14px' }}>
                            X
                        </Button>
                    </DialogTitle>
                    <DialogContent className="container__imgs">
                        {props?.images?.map((img, index) => (
                            <img key={index} className="img" src={img}></img>
                        ))}
                    </DialogContent>
                </div>
            </Dialog>
        </div>
    );
}
