import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import bigStar from "../assets/BigStar.png" 
import {useParams} from 'react-router-dom'
import { fetchOneDevice } from '../http/deviceAPI';
import { addDeviceToCart } from '../http/cartAPI';

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const addToCart = async (id) =>{
        try{
            await addDeviceToCart(id).then(() => alert("Товар добавлен в корзину!"))
        }catch(e){
            alert("Ошибка: товар не был добавлен")
        }
        
    }   

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Row><Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/></Row>
                    <Row className="d-flex flex-column align-items-center">
                        
                    </Row>
                    <Row style={{alignItems: "center", justifyContent: "center"}}><Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{marginTop: 20, width: 300, height: 200, fontSize: 20, border: '5px solid rgb(97, 105, 250)'}}
                    >
                        <h2 style={{marginBottom: 20, textAlign: 'center'}}>{device.name}</h2>
                        <h3 style={{textAlign: 'center'}}><span style={{fontWeight: 900}}>{device.price}</span> $</h3>
                        <Button style={{borderRadius: "1rem", backgroundColor: 'rgb(117, 255, 216)', fontWeight: 600, color: 'grey', border: "1px solid black"}} onClick={() => addToCart(device.id)}>Добавить в корзину</Button>
                    </Card></Row>
                </Col>
                <Col md={4} style={{width: 400}}>
                    <Row className="d-flex flex-column m-3">
                        <h2>Описание свойств товара:</h2>
                        {device.info.map((info, index) =>
                            <Row key={info.id} style={{background: index % 2 === 0 ? 'rgba(91, 255, 255, 0.38)' : 'transparent', padding: 10}}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
                </Col>
            </Row>
            
        </Container>
    );
};

export default DevicePage;