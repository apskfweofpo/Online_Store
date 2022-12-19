import React, {useContext, useRef} from 'react';
import {Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

import CartItem from '../../components/CartItem/CartItem';
import OrderWindow from '../../components/modals/OrderWindow/OrderWindow';
import styles from './Cart.module.scss'
import { deleteAllDevices, fetchDevicesFromCart } from '../../http/cartAPI';


const Cart = observer(() => {
  const [formVisibility, setFormVisibility] = React.useState(false)
  const [cart, setCart] = React.useState([])
  let totalSum = cart.reduce((sum, item) => sum + item.dataValues.price, 0)
  React.useEffect(() => {
    fetchDevicesFromCart().then(data => setCart(data));
    
  }, [])
  //console.log("\n------------------Log from cart----------------------\n", cart)

  const showModalWindow = () => {
    setFormVisibility(!formVisibility)
  }

  const deleteOneCartItem = (logId) =>{
    setCart(cart.map(item => {
      if (item.logId !== logId) {
        //console.log("---------------------------Item from setter--------------------\n", item)
         return item
      }
   }));
    totalSum = cart.reduce((sum, item) => item.logId !== logId ? sum + item.dataValues.price : sum + 0, 0)
  }

  const deleteCartItems = () => {
    deleteAllDevices()
    setCart([])
    totalSum = 0
  }
  
  return (
  <>
    {formVisibility && (<OrderWindow setFormVisibility={setFormVisibility} totalSum={totalSum} cart={cart}/>)}
    <div className={styles.container}> 
      <div className={styles.cart}>
          <div className={styles.top}>
            <h2 className={styles.title}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 
                  14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 
                  5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 
                  15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 
                  10.5933C15.1524 10.9003 14.9854 11.176 
                  14.7417 11.3722C14.4979 11.5684 14.1929 
                  11.6727 13.88 11.6667H6.83335C6.50781 
                  11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 
                  5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 
                  4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Корзина
            </h2>
            
          </div>
          <div className={styles.items}>
            {cart.length ? cart.map(device => <CartItem deleteOne={deleteOneCartItem} key={device.logId} device={device.dataValues} logId={device.logId}/>) 
            : (<div className={styles.noinfo}>Ваша корзина пуста. Отправляйтесь за покупками :D</div>)}
          </div>
          <div className={styles.bottom}>
            <div className={styles.details}>
              <span>
                {' '}
                Всего товаров: <b>{cart.length} шт.</b>{' '}
              </span>
              <span>
                {' '}
                Сумма заказа: <b>{totalSum} $</b>{' '}
              </span>
            </div>
            <div className={styles.buttonsBar}>
              <div className={styles.clearAll} onClick={() => deleteCartItems()}>
                <span>Очистить корзину</span> 
              </div>
              <button className={styles.payButton} onClick={() => showModalWindow()}>
                <span>Оформить заказ</span>
              </button>
            </div>
          </div>
        </div>
        
    </div>
    <div className={styles.buttonBackWrapper}><Link to="/" className={styles.buttonBack}>
                <span>Вернуться назад</span>
              </Link>
      </div>
    
    </>
  );
});

export default Cart;
