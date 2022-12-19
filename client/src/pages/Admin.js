import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <div style={{justifyContent: 'center', display: "flex", flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center', fontSize: 40, fontWeight: 700, marginBottom: 40}}>Админ панель</div>
            <Container className="d-flex flex-row" style={{justifyContent: 'space-around'}}>
                <Button
                    
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setTypeVisible(true)}
                >
                    Добавить тип
                </Button>
                <Button
                    
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setBrandVisible(true)}
                >
                    Добавить бренд
                </Button>
                <Button
                    
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setDeviceVisible(true)}
                >
                    Добавить устройство
                </Button>
                <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
                <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            </Container>
        </div>
    );
};
export default Admin;