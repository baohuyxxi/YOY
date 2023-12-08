import { useNavigate, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConvenientItem from '~/components/ConvenientItem/ConvenientItem';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import publicFacilityAPI from '~/services/apis/publicAPI/publicFacilityAPI';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useSnackbar } from 'notistack';
import './ConvenientSetting.scss';
import { useState, useEffect } from 'react';

export default function ConvenientSetting(props) {
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [dataListCatagoryConvenient, setDataListCategoryConvenient] = useState([]);
    const [data, setData] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const nameConvenient = `${
        props?.convent && props?.convent.length !== 0 && props?.convent[0]?.faciCateName
            ? props?.convent[0]?.faciCateName
            : ''
    } ${
        props?.convent !== undefined && props?.convent.length !== 0 && props?.convent[1]?.faciCateName
            ? `, ${props?.convent[1]?.faciCateName}`
            : ''
    }`;

    const handleSave = (e) => {
        e.preventDefault();
        const newData = {
            id: params?.idHome,
            data: {
                facilityCodes: data
            }
        };
        partnerManageAPI
            .updateFacility(newData)
            .then((dataResponse) => {
                enqueueSnackbar('Cập nhật thành công', { variant: 'success' });
            })
            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    useEffect(() => {
        publicFacilityAPI.getAllDataFacility().then((dataResponse) => {
            setDataListCategoryConvenient(dataResponse.data);
        });
        publicAccomPlaceAPI.getRoomDetail(params.idHome).then((res) => {
            const temp = res.data.facilityCategoryList.flatMap((result) => {
                return result.infoFacilityList.flatMap((code) => {
                    return code.facilityCode;
                });
            });
            setData(temp);
            setLoading(false);
        });
    }, [params?.idHome]);

    return (
        <div style={{ fontSize: '15px', paddingRight: '50px', paddingBottom: '50px', fontWeight: '600' }}>
            <h3>Tiện ích</h3>
            <Accordion onClick={handleChange}>
                <AccordionSummary
                    expandIcon={<NavigateNextIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <p style={{ width: '33%', flexShrink: 0 }}>Tiện ích</p>
                    <p style={{ color: 'text.secondary' }}>{nameConvenient}</p>
                </AccordionSummary>
                {loading ? (
                    <></>
                ) : (
                    <AccordionDetails
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className="container__facilityCate"
                    >
                        {dataListCatagoryConvenient?.map((child, index) => (
                            <div key={index}>
                                <ConvenientItem
                                    data={data}
                                    setData={setData}
                                    dataConveni={child.infoFacilityList}
                                    name={child.faciCateName}
                                />
                            </div>
                        ))}
                    </AccordionDetails>
                )}

                <AccordionDetails>
                    <div className="btn">
                        <p onClick={handleClose} className="btn-close">
                            Hủy
                        </p>
                        <button type="submit" onClick={handleSave} className="btn-save">
                            Lưu
                        </button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
