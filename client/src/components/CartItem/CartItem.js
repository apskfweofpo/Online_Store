import React from 'react'

import {Image} from "react-bootstrap";

import styles from './CartItem.module.scss';
import cross from '../../assets/cross.svg'
import { deleteOneDevice } from '../../http/cartAPI';


const CartItem = ({device, logId, deleteOne}) => {
  const {id, name, img, price} = device

  const deleteItemFromCart = (id) =>{
      deleteOneDevice(id)
      deleteOne(id)
      window.location.reload()
      alert("Товар успешно убран из корзины")
  }
  return (
    <div className={styles.item}>
      <div className={styles.imgBlock}>
        <Image className={styles.imgDevice} width={150} height={150} src={process.env.REACT_APP_API_URL + img}/>
      </div>
      <div className={styles.name}>
        <h3>{name}</h3>
      </div>
      <div className={styles.price}>
        <b>{price} BYN</b>
      </div>
      <div className={styles.removeOne} onClick={() => deleteItemFromCart(logId)}>
        <div>
          <img className={styles.img} src={cross} alt='cross'/>
        </div>
      </div>
  </div>)
}

export default CartItem ;