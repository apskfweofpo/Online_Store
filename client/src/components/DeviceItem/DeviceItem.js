import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import  star from '../../assets/Vector.png'
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import styles from './DeviceItem.module.scss'


const DeviceItem = ({device}) => {
    const history = useHistory()

    const {name, rating, price, id, img} = device;
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + id)}>
            <Card className={styles.card}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div></div>
                    <div className="d-flex align-items-center">
                        <div>Рейтинг: <span className={styles.rating}>{rating}</span></div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{name}</div>
                <div className={styles.priceCont}>Цена: <span className={styles.priceValue}>{price}</span> BYN</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;