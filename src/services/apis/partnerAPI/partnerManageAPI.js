import axios from '~/services/axios';
import { id } from 'date-fns/locale';

const partnerManageAPI = {
    createHomeDetailByHost: async (data) => {
        const res = await axios.post(`/partner/accoms/create`, data);
        return res;
    },
    addImageHomeByHost: async (data) => {
        let formData = new FormData();
        data.imageList.forEach((image) => {
            formData.append('files', image);
        });
        const res = await axios.post(`/partner/accoms/${data.id}/images/create`, formData);
        return res.data;
    },
    getListHomeOfPartner: async() =>{
        const res = await axios.get(`/partner/accoms/pages?pageNumber=0&pageSize=99`);
        return res.data;
    },
 
   
    getRoomCategory: async(data) => {
        const res = await axios.get(`/url${data}`);
        return res.data;
    },
    updateTitleHome: async(data) =>{
        const res = await axios.put(`/partner/accoms/title?accomId=${data.id}`,data.data);
        return res.data;
    },
    setSurcharge: async(data) =>{
        console.log(data)
        return 0
    },
    updateAddressHome: async(data) => {
        const res = await axios.put(`/partner/accoms/address?accomId=${data.id}`,data.data);
        return res.data;
    },
     updatePriceHome: async(data) => {
        const res = await axios.put(`/partner/accoms/change-price?pricePerNight=${data.pricePerNight}&accomId=${data.id}`);
        return res.data;
    },
    updateRoomHome: async(data) => {
        console.log(data)
        const res = await axios.put(`/partner/accoms/room?accomId=${data.id}`,data.data);
        return res.data;
    },
    updateFacility: async(data) => {
        console.log(data)
        const res = await axios.put(`/partner/accoms/facility?accomId=${data.id}`,data.data);
        return res.data;
    },
    updateImagesHome: async(data) =>{
        const res = await axios.put(`partner/accoms/images?accomId=${data.id}`,data.data)
        return res.data
    }
    
};
export default partnerManageAPI;
