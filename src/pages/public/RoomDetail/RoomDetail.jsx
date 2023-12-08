import './RoomDetail.scss';
import { t } from 'i18next';
import moment from 'moment';
import format from 'date-fns/format';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import iconStar from '~/assets/svg/star.svg';
import ListImage from '~/components/ListImage/ListImage';
import Convenient from '~/components/Convenient/Convenient';
import DialogConvenient from '~/components/DialogConvenient/DialogConvenient';
import BedRoomSlider from '~/components/BedRoomSlider/BedRoomSlider';
import DateGo from '~/components/DateGo/DateGo';
import Dropdown from '~/components/Dropdown/Dropdown';
import PopoverPrice from '~/components/PopoverPrice/PopoverPrice';
import CommentReview from '~/components/CommentReview/CommentReview';
import FramePage from '~/components/FramePage/FramePage';
import DateIsBooking from '~/components/DateIsBooking/DateIsBooking';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomDetail from '~/components/Skeleton/SkeletonRoomDetail';
import formatPrice from '~/utils/formatPrice';


import bookingSlice from '~/pages/client/BookingPage/bookingSlice';
import { guestsModel } from '~/share/models/booking';

export default function RoomDetail() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const roomId = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);
    const [loading, setLoading] = useState(true);
    const [dataDetailHome, setDataDetalHome] = useState('');
    const [dateBook, setDateBook] = useState([moment().format('DD/MM/yyyy'), moment().format('DD/MM/yyyy')]);
    const [guests, setGuests] = useState(guestsModel);
    const [detailPrice, setDetailPrice] = useState([]);
    const [surcharge, setSurcharge] = useState('');
    const [totalBill, setTotalBill] = useState('');
    const [disBooking, setDisBooking] = useState(true);
    const dataBooking = useSelector((state) => state.booking);
    
    useEffect(() => {
        publicAccomPlaceAPI.getRoomDetail(roomId.id).then((dataResponse) => {
            setDataDetalHome(dataResponse.data);
            setLoading(false);
        });
    }, [roomId?.id]);
    const stars = [];
    for (let i = 0; i < dataDetailHome.gradeRate; i++) {
        stars.push(<img key={i} src={iconStar} alt="icon__star" className="star" />);
    }
    useEffect(() => {
        const dataCheck = {
            checkIn: dateBook[0],
            checkOut: dateBook[1],
            accomId: roomId.id,
            numAdult: guests.numAdult
        };
        publicAccomPlaceAPI.checkBooking(dataCheck).then((response) => {
            if (response?.statusCode === 200) {
                setDisBooking(false);
                setSurcharge(response.data.costSurcharge);
                setTotalBill(response?.data?.totalBill);
            } else {
                setDisBooking(true);
            }
        });
    }, [guests.numAdult, dateBook]);

    const handleBooking = () => {
        if (user === null || user === undefined) {
            enqueueSnackbar(t('message.warningSignin'), { variant: 'warning' });
        } else {
            const dataBooking = {
                checkIn: dateBook[0],
                checkOut: dateBook[1],
                accomId: roomId.id,
                guests: guests,
                priceDay: dataDetailHome?.pricePerNight,
                surcharge: surcharge,
                originPay: totalBill,
                nameCustomer: user.firstName + user.lastName,
                phoneNumberCustomer: user.phone
            };
            dispatch(bookingSlice.actions.addInfoBooking(dataBooking));
            navigate('/booking');
        }
    };

    const handleChangeDayBooking = (value) => {
        const checkIn = format(value[0].startDate, 'dd/MM/yyyy');
        const checkOut = format(value[0].endDate, 'dd/MM/yyyy');
        setDateBook([checkIn, checkOut]);
    };
    const handleChangeGuests = (value) => {
        setGuests(value);
    };

    return (
        <FramePage>
            {loading ? (
                <SkeletonRoomDetail />
            ) : (
                <>
                    <div className="content detail-room">
                        <div className="info-room">
                            <div className="header-room">
                                <h1>{dataDetailHome.accomName}</h1>
                                <div className="heading">
                                    <div className="heading__left">
                                        <div className="obility__room">
                                            <p>{dataDetailHome.accomCateId}</p>
                                            {stars}
                                        </div>
                                        <div className="locate__room">
                                            <FmdGoodIcon className="icon_locate" />
                                            <p>{dataDetailHome.addressGeneral}</p>
                                        </div>
                                    </div>
                                    <div className="heading__right">
                                        {/* <StarIcon className="icon_rate" />
                                        <p>{dataDetailHome?.averageRate}</p> */}
                                        <p className="link__rate">
                                            {`(${dataDetailHome?.numView} ${t('numberCount.viewInDetal')})`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ListImage listImage={dataDetailHome.imageAccomsUrls} />
                            <div className="about-room">
                                <div className="row">
                                    <div className="col l-8 m-7 c-12">
                                        <div className="paper title-room">
                                            <div className="desc-room">
                                                <h2>{t('contentMain.descHome')}</h2>
                                                <p>{dataDetailHome.description}</p>
                                                <h3>{t('home.addressDetail')}: {dataDetailHome.addressDetail}</h3>
                                                <h3>{t('home.acreage')}: {dataDetailHome.acreage} m²</h3>
                                                <h3>{t('home.numPeople')}: {dataDetailHome.numPeople}</h3>
                                                <h3>{t('home.numBathRoom')}: {dataDetailHome.numBathRoom}</h3>
                                            </div>

                                            <hr className="divider" />
                                            <h2>{t('contentMain.convenient')}</h2>
                                            <Convenient listConvenient={dataDetailHome.facilityCategoryList} row={2} />
                                            <DialogConvenient listConvenient={dataDetailHome.facilityCategoryList} />
                                            <hr className="divider" />
                                            <div className="bed-room">
                                                <h2>{t('contentMain.bedroom')}</h2>
                                                <BedRoomSlider bedRooms={dataDetailHome.bedRooms} />
                                            </div>
                                        </div>
                                        <DateIsBooking bookedDates={dataDetailHome.bookedDates} />
                                    </div>
                                   
                                    <div className="col l-4 m-5 c-12">
                                        <div className="card-book__detail paper">
                                            <div className="price-room">
                                                {formatPrice(dataDetailHome?.pricePerNight)}/Đêm
                                            </div>
                                            <div className="date-book">
                                                <div className="title__date-book">
                                                    <p>{t('contentMain.fromDay')}</p>
                                                    <p>{t('contentMain.toDay')}</p>
                                                </div>
                                                <DateGo
                                                    size="vertical"
                                                    setDataDay={handleChangeDayBooking}
                                                    setDateBook={setDateBook}
                                                />
                                            </div>
                                            <div className="count__guest">
                                                {/* <p>{t('numberCount.countClient')}</p> */}
                                                <Dropdown
                                                    guests={guests}
                                                    setGuests={setGuests}
                                                    handleChangeGuests={handleChangeGuests}
                                                />
                                            </div>

                                            <div className="line">
                                                <hr />
                                            </div>

                                            <div className="price-total">
                                                <div className="title-price">
                                                    <PopoverPrice detailPrice={detailPrice} />
                                                </div>
                                                <div className="real-price">
                                                    <p style={{ fontWeight: '550' }}>{formatPrice(totalBill)}</p>
                                                </div>
                                            </div>

                                            {dataDetailHome?.surchargeList?.map((sur, index) => (
                                                <div className="price-total" key={index}>
                                                    <div className="title-price">
                                                        <p className="name-surcharge">{`${sur?.surchargeName}`}</p>
                                                    </div>
                                                    <div className="real-price">
                                                        <p className="cost-surcharge">{formatPrice(sur?.cost)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="line" style={{ marginTop: '10px' }}>
                                                <hr />
                                            </div>
                                            <div className="btn-booking">
                                                <button
                                                    disabled={disBooking}
                                                    className="btn-booking-room"
                                                    onClick={handleBooking}
                                                >
                                                    {t('common.booking')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CommentReview id={roomId.id}/>
                        </div>
                    </div>
                </>
            )}
        </FramePage>
    );
}
