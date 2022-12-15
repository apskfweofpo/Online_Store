import React, {useContext} from 'react';
import {Context} from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE} from "../../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import logoFPS from "../../assets/Logo.png"
import styles from './NavBar.module.scss'


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar className={styles.navbar} variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}><img className={styles.logo}src={logoFPS} alt="КупиФПС"/></NavLink>
                <Nav className={styles.navButtons} style={{color: 'white'}}>

                    <Button className={styles.auth} variant={"outline-light"} onClick={() => history.push(CART_ROUTE)}>
                        Корзина
                    </Button>

                    {user.isAuth ?
                        (<><Button className={styles.auth} variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>
                            Админ панель
                        </Button>
                        
                        <Button className={styles.logout} variant={"outline-light"} onClick={() => {logOut(); history.push(LOGIN_ROUTE)}}>
                            Выйти
                        </Button></>) :
                        <>
                            <Button className={styles.auth} variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                        </>
                        }
                </Nav>
            </Container>
        </Navbar>

    );
});

export default NavBar;