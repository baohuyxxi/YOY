import { useEffect, useState } from 'react';

import AOS from 'aos';

import 'aos/dist/aos.css';
import { t } from 'i18next';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import LinearProgress from '@mui/material/LinearProgress';

import FormEvaluate from '~/components/FormEvaluate/FormEvaluate';
import DoneIcon from '@mui/icons-material/Done';
import ModalConfirmDelete from '~/components/ModalConfirmDelete/ModalConfirmDelete';

import FramePage from '~/components/FramePage/FramePage';
import PopoverRefundPolicy from '~/components/PopoverRefundPolicy/PopoverRefundPolicy';
import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';
import formatPrice from '~/utils/formatPrice';
import './HistoryBookingPage.scss';

AOS.init();

const HistoryBookingPage = () => {
    const [dataHistory, setDataHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFormReview, setShowFormReview] = useState(false);
    const [idBooking, setIdBooking] = useState('');
    useEffect(() => {
        bookingAPI.getHistoryBooking().then((dataResponse) => {
            setDataHistory(dataResponse?.data?.content);
            setLoading(false);
        });
    }, []);

    const handleReview = (value) => {
        setIdBooking(value);
        setShowFormReview(true);
    };

    const handleCloseReview = () => {
        setShowFormReview(false);
    };

    return (
        <FramePage>
            <div className="history-booking__page">
                <h1>{t('title.history')}</h1>
                {loading && <LinearProgress />}
                <div
                    data-aos="fade-up"
                    data-aos-duration="1900"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center"
                >
                    <div className="list-booking-history">
                        {dataHistory.length === 0 ? (
                            <div className="paper nodata">
                               <p>Bạn chưa đặt chỗ</p>
                                <img src="/src/assets/video/BookingNow.gif"></img>
                            
                            </div>
                        ) : (
                            <>
                                {dataHistory?.map((history, index) => {
                                    var status = '';
                                    if (history?.status === 'CANCELED') {
                                        status = t('contentMess.cancel');
                                    } else if (history?.status === 'CHECK_IN') {
                                        status = t('contentMess.checkin');
                                    } else if (history?.status === 'CHECK_OUT') {
                                        status = t('contentMess.checkout');
                                    }
                                    return (
                                        <div className="item__booking paper" key={index}>
                                            <div className="img-item__booking">
                                                <img src={history.imageUrl} alt="img-booking" className="img-booking" />
                                            </div>
                                            <div className="info-history__booking">
                                                <p className="name-history__booking">{history?.nameAccom}</p>
                                                <p className="name-host-history__booking">{`(${t(
                                                    'title.bookingOfYou.owner'
                                                )} ${history?.fullNameHost})`}</p>
                                                <div className="locate-hictory__booking">
                                                    <FmdGoodIcon className="icon-locate-booking" />
                                                    <p>{history.generalAddress}</p>
                                                </div>
                                                <p className="guests-history___booking">{`${t('label.totalClient')} ${
                                                    history?.numAdult
                                                }`}</p>
                                                <div className="date-history__booking">
                                                    <p>{`${t('label.fromDay')} ${history?.checkIn}`}</p>
                                                    <p>{`${t('label.toDay')} ${history?.checkOut}`}</p>
                                                </div>
                                            </div>
                                            <div className="price-history__booking">
                                                <div className="price-day__booking">
                                                    <p>{t('label.priceNight')}</p>
                                                    <p style={{ paddingLeft: '5px', fontWeight: '600' }}>
                                                        {formatPrice(history?.originPay)}
                                                    </p>
                                                </div>
                                                <div className="price-total__booking">
                                                    <p>{t('label.totalPrice')}</p>
                                                    <p style={{ paddingLeft: '5px', fontWeight: '700', color: 'red' }}>
                                                        {formatPrice(history?.totalBill)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="btn__booking">
                                                {/* <div>
                                                <PopoverRefundPolicy dataShow={history?.refundPolicy} />
                                            </div> */}
                                                <div style={{ justifyContent: 'left', width: '130px' }}>
                                                    {history?.status !== 'WAITING' ? (
                                                        <>
                                                            <p className={history?.status}>{status}</p>
                                                            {history.reviewed === true ? (
                                                                <div style={{ display: 'flex' }}>
                                                                    <h3 className="reviewed">
                                                                        {t('common.reviewed')}
                                                                        <DoneIcon />
                                                                    </h3>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleReview(history.bookingCode)}
                                                                    className="review"
                                                                >
                                                                    {t('common.review')}
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <ModalConfirmDelete idRemove={history.bookingCode} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                        <FormEvaluate
                            showFormReview={showFormReview}
                            handleCloseReview={handleCloseReview}
                            bookingCode={idBooking}
                        />
                    </div>
                </div>
            </div>
        </FramePage>
    );
};

export default HistoryBookingPage;
