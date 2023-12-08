import React from 'react';
import { t } from 'i18next';
import './Convenient.scss';

const Convenient = (props) => {
    const row = props.row
    const length = props.listConvenient.length +1
    const infoFacilityList = props.listConvenient.flatMap(item =>  item.infoFacilityList);
    const element = [];
    for (let i = 0; i < row; i++) {
        const cutData = infoFacilityList.slice(length*i/row, (length+1)*(i+1)/row)
        element.push(
            <div key={i}
                className= {`col l-${12/row}`}>
                 {cutData.map((convi, index) => (
                        <div className=".container__setting__convenien" key={index}>
                            <img src={convi.imageUrl} alt="icon-convenient" className="icon-convenient" />
                            <p style={{ textDecorationLine: "none" }}>
                                {convi.facilityName}
                            </p>
                        </div>
                    ))}
                
            </div>
        )
    }
    return (
        <div className="convenient-room">
            <div className="row">
               {element}
            </div>
        </div>
    );
};

export default Convenient;
