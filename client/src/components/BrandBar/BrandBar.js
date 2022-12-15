import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {Card, Form, Row} from "react-bootstrap";
import styles from './BrandBar.module.scss';

const BrandBar = observer (() => {
    const {device} = useContext(Context)

    return (
        <Form className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    onClick={() => {brand.id === device.selectedBrand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand)}}
                    className={brand.id === device.selectedBrand.id ? styles.active : styles.brand}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
    );
});

export default BrandBar;