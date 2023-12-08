import { useNavigate, useParams } from 'react-router-dom';
import { typeRoom, typeBedRoom } from '~/share/models/roomHome';
import CountNumber from '~/components/CountNumber/CountNumber';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './CountRoomDetailSetting.scss';

import { useEffect, useState } from 'react';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CountRoomDetailSetting = (props) => {
    const [numRoom, setNumRoom] = useState(typeRoom);
    const [bedRooms, setBedRooms] = useState([]);
    const [allBedRoom] = useState(typeBedRoom);
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (numRoom[0].number > bedRooms.length) {
            setBedRooms((prevBedRooms) => [...prevBedRooms, 'Giường đơn']);
        } else if (numRoom[0].number === bedRooms.length - 1) {
            setBedRooms((prevBedRooms) => prevBedRooms.slice(0, -1));
        }
    }, [numRoom[0].number]);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomDetail(`${params.idHome}`).then((dataRoom) => {
            setNumRoom(
                numRoom.map((room) => {
                    return {
                        ...room,
                        number: dataRoom?.data[room.key] || 0
                    };
                })
            );
            setBedRooms(dataRoom?.data.bedRooms);
        });
    }, [params.idHome]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const handleSaveRoom = (e) => {
        e.preventDefault();
        const newData = {
            homeId: params?.idHome,
            data: {
                typeBedCodes: bedRooms,
                numKitchen: numRoom[1].number,
                numBedRoom: numRoom[0].number,
                numBathRoom: numRoom[2].number,
                accomCateName: props.accomCate
            }
        };

        partnerManageAPI.updateRoomHome(newData);
    };

    const onChange = (value, index) => {
        const updatedBedRooms = [...bedRooms];
        updatedBedRooms[index] = value;
        setBedRooms(updatedBedRooms);
    };
    return (
        <div className="content-count__roomdetail__setting" style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px', fontWeight:'600' }}>
            <form onSubmit={handleSaveRoom}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <div  className='header__typeRoom'>
                            {numRoom?.map((room, index) => (
                                <div key={index} className='typeRoom'>
                                    <p>{room.name}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{ display: 'flex' }}
                    >
                        <div className="countRoom">
                            {numRoom?.map((room, index) => (
                                <div key={index}>
                                    <CountNumber
                                        keyType={room.key}
                                        data={numRoom}
                                        number={room.number}
                                        setData={setNumRoom}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                    <AccordionDetails
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        style={{ display: 'flex' }}
                    >
                        <div className="container__bedroom">
                            {bedRooms?.map((bed, index) => (
                                <div key={index} className="option__bed">
                                    <p>Phòng ngủ số {index + 1}</p>
                                    <CustomInput
                                        size="small"
                                        value={bed}
                                        onChange={(e) => onChange(e.target.value, index)}
                                        select={true}
                                        content={allBedRoom.map((option) => (
                                            <MenuItem key={option.name} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div className="btn">
                            <p onClick={handleClose} className="btn-close">
                                Hủy
                            </p>
                            <button type="submit" className="btn-save">
                                Lưu
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
};

export default CountRoomDetailSetting;
