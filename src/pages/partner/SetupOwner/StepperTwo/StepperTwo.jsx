import React, { useEffect, useState } from 'react';
import { t } from 'i18next';

import ConfirmClose from '~/components/ConfirmClose/ConfirmClose';
import CountNumber from '~/components/CountNumber/CountNumber';
import CountNumberGuest from '~/components/CountNumber/CountNumberGuest';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import './StepperTwo.scss';

const StepperTwo = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        publicAccomPlaceAPI.getRoomCategory().then((dataResponse) => {
            setData(dataResponse?.data);
        });
    }, []);
    return (
        <div className="step-two">
            <div className="row">
                <div className="col l-6 m-6">
                    <div className="require-step2">
                        {/* <img
                            src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Gif_Pro/tao-nhieu-moi-cau-thu-hut-khach-hang-tiem-nang.png"
                            alt=""
                            className="image-step2"
                        />
                        <h1>{t('setupOwner.content_step_two')}</h1> */}
                    </div>
                </div>
                <div className="col l-6 m-6">
                    <div className="info-count__room">
                        <CustomInput
                            className="cateName"
                            select={true}
                            size="small"
                            id="cateName"
                            value={props.accomCateName}
                            onChange={(event) => {
                                props.setAccomCate(event.target.value.accomCateName);
                            }}
                            title={t(`title.category`)}
                            width={400}
                            content={data.map((cate, index) => (
                                <MenuItem key={index} value={cate}>
                                    {cate.accomCateName}
                                </MenuItem>
                            ))}
                        ></CustomInput>
                        <div className="count tenant">
                            <p>{t('setupOwner.client')}</p>
                            <CountNumberGuest setCountGuest={props.setCountGuest} />
                        </div>
                        {props.dataStep2?.map((room, index) => (
                            console.log(props.dataStep2),
                            <div key={index}>
                                <div className="count ">
                                    <p>{room.name}</p>
                                    <CountNumber
                                        keyType={room.key}
                                        data={props.dataStep2}
                                        setData={props.setDataStep2}
                                        number={room.number}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ConfirmClose />
                </div>
            </div>
        </div>
    );
};

export default StepperTwo;
