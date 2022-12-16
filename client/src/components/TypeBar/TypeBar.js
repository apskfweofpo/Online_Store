import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {ListGroup} from "react-bootstrap";
import styles from './TypeBar.module.scss'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    className={type.id === device.selectedType.id ? styles.active : styles.type}
                    style={{cursor:'pointer'}}
                    onClick={() => {type.id === device.selectedType.id ? device.setSelectedType({}) : device.setSelectedType(type)}}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;