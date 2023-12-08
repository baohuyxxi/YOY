import './CheckButton.scss';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const CheckButton = (props) => {
    const [checkStatus, setCheckStatus] = useState(props.active);
    const handleCheckNo = () => {
        if (checkStatus === true) {
            setCheckStatus(false);
            props.setData((prevData) => prevData.filter((code) => code !== props.code));
        }
    };

    const handleCheckYes = () => {
        if (checkStatus === false) {
            setCheckStatus(true);
            props.setData((prevData) => [...prevData, props.code]);
        }
    };

    return (
        <div className="check-btn">
            <div name="yes" className={`btn-no ${checkStatus === false ? 'check-no' : ''}`} onClick={handleCheckNo}>
                <CloseIcon />
            </div>
            <div name="no" className={`btn-yes ${checkStatus === true ? 'check-yes' : ''}`} onClick={handleCheckYes}>
                <CheckIcon />
            </div>
        </div>
    );
};

export default CheckButton;
