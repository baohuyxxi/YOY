import React from 'react';
import { Box, Modal, Slider, Button } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

import ViewImage from '../ViewImage/ViewImage';
import { t } from 'i18next';

export default function TestComponent() {
    const [images, setImages]=useState([])
  


    return (
        <>
            <button
                onClick={(e) => {
                    setImages([
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786296/oyo_booking/pwdqptzz5smyqo8swarc.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786304/oyo_booking/rmypksjq8z7tjzvybdxq.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786300/oyo_booking/vniz00jcteurjm5xhuph.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786293/oyo_booking/cirohhtgg9eiv2cewbvk.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786301/oyo_booking/x3vkenwyv9srcnrkium8.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786298/oyo_booking/xksq22duvmxrcjntlbao.jpg',
                        'https://res.cloudinary.com/dyv5zrsgj/image/upload/v1701786302/oyo_booking/c7iqo6mk9twnx0qen5m2.jpg'
                    ])
                    setOpen(true);
                }}
            >
                View
            </button>
            <ViewImage setImages={setImages} images={images} />
        </>
    );
}
