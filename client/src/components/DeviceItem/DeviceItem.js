import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import  star from '../../assets/Vector.png'
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../../utils/consts";
import styles from './DeviceItem.module.scss'


const DeviceItem = ({device}) => {
    const history = useHistory()

    const {name, price, id, img} = device;
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + id)}>
            <Card className={styles.card}>
                <div className={styles.imgWrapper}><Image width={150} height={150} src={process.env.REACT_APP_API_URL + img} className={styles.img}/></div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div></div>
                </div>
                <div>{name}</div>
                <div className={styles.priceCount}>Цена: <span className={styles.priceValue}>{price}</span> $</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;