import React from 'react'

import {Image} from "react-bootstrap";

import styles from './CartItem.module.scss';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import cross from '../../assets/cross.svg'
import { addDeviceToCart, deleteOneDevice } from '../../http/cartAPI';


const CartItem = ({device}) => {
  const {name, price, id, img} = device
  return (
    <div className={styles.item}>
      <div className={styles.imgBlock}>
        <Image className={styles.imgDevice} width={150} height={150} src={process.env.REACT_APP_API_URL + img}/>
      </div>
      <div className={styles.name}>
        <h3>{name}</h3>
      </div>
      <div className={styles.counter}>
        <div><img className={styles.img} 
        src={minus} 
        alt='minus'/></div>
        <b>count</b>
        <div onClick={() => addDeviceToCart(id)}><img className={styles.img} src={plus}
        alt='plus'/></div>
      </div>
      <div className={styles.price}>
        {/* <b>{price * count} ₽</b> */}
        <b>{price} BYN</b>
      </div>
      <div className={styles.removeOne} onClick={() => deleteOneDevice(id)}>
        <div>
          <img className={styles.img} src={cross}
          alt='cross'/>
        </div>
      </div>
  </div>
  )
}

export default CartItem ;