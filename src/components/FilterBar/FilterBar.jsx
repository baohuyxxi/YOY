import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import Button from '@mui/material/Button';

import './FilterBar.scss';
import DialogFilter from '../DialogFilter/DialogFilter';

const FilterBar = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 10,
        slidesToScroll: 10,
        initialSlide: 0
    };
    const [listAccomCateData, setListAccomCateData] = useState(null);
    const [indexActive, setIndexActive] = useState(-1);
    useEffect(() => {
        async function fetchData() {
            const res = await publicAccomPlaceAPI.getAllAccomCategoryInfo();
            setListAccomCateData(res.data);
        }
        fetchData();
    }, []);
    const handleFilterCate = (index, current) => {
        setIndexActive(index);
        if (current === null) {
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({ queryParams: ``, pageSize: props?.pagi })
                .then((dataResponse) => {
                    props.filterData(dataResponse.data.content);
                });
        } else {
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({
                    queryParams: `accomCateName=${current?.accomCateName}`,
                    pageSize: props?.pagi
                })
                .then((dataResponse) => {
                    props.filterData(dataResponse.data.content);
                });
        }
    };
    const handleReset = () => {
        publicAccomPlaceAPI.getAllRoomsWithFilter({ queryParams: ``, pageSize: props?.pagi }).then((dataResponse) => {
            props.filterData(dataResponse.data.content);
        });
    };
    // const handleFilter = (idActive, idFilter) => {
    //     console.log(idActive, idFilter)
    //     setIndexActive(idActive);
    //     if (idFilter === null) {
    //         filterApi.getAllRoomsWithFilter({ queryParams: ``, pageSize: props?.pagi }).then((dataResponse) => {
    //             props.filterData(dataResponse.data.content);
    //         });
    //         navigate({
    //             search: ``
    //         });
    //     } else {
    //         publicAccomPlaceAPI.getAllRoomsWithFilter({ queryParams: 0, pagi: props?.pagi }).then((dataResponse) => {
    //             props.filterData(dataResponse.data.content);
    //         });
    //         navigate({
    //             search: `amenityId=${idFilter}&`
    //         });
    //     }
    // };
    return (
        <div className="filter-bar">
            <Slider {...settings}>
                {listAccomCateData?.map((current, index) => (
                    <div key={index}>
                        <div
                            className={`slider__item-filter  ${index === indexActive && 'active'}`}
                            onClick={() => handleFilterCate(index, current)}
                        >
                            <div className="icon-filter">
                                <img src={current?.icon} alt="icon-filter" />
                            </div>
                            <div className="title-filter">
                                <p>{current?.accomCateName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <DialogFilter filterData={props.filterData} pagi={props.pagi} dataQueryDefauld={props.dataQueryDefauld} />
            <Button onClick={handleReset}>Làm mới</Button>
        </div>
    );
};
export default FilterBar;
