import axios from 'axios';
import React from 'react'
import {addOrder} from '../../../http/orderApi'

import styles from './OrderWindow.module.scss'


const OrderWindow = ({setFormVisibility, totalSum}) => {

    const [payMethod, setPayMethod] = React.useState("card");

    const  sendOrder = async (orderParams) => {
        const {name, phone, address, comment, paymentType, price, description} = orderParams;
        
        await addOrder(
        {
            description,
            name,
            phone,
            address,
            comment,
            price,
            paymentType
        })
        .then(() => {
            alert("Заказ успешно оформлен. Скоро менеджер с вами свяжется. Спасибо, что выбрали нас!")
        })
        .catch(() => {
            alert("Ошибка создания заказа: Отправлены некорректные данные!")
        })
    };

    // const createDescription = () =>{
    //     let description = ""
    //     description += items.map((item) => {
    //         return `{Название: ${item.title}, Тип: ${pizzaTypes[item.types]}, Размер: ${pizzaSizes[item.sizes]}, Количество: ${item.count}}, `
    //     })

    //     return description
    // }

    React.useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {document.body.style.overflow = ''}
    },  [])

    const [form, setForm] = React.useState({
        // description: createDescription(),
        description: '',
        name: "",
        phone: "",
        address: "",
        price: 0,
        paymentType: ""
    });


    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const changePayMethod = (method) => {
        setPayMethod(method)
        setForm({...form, paymentType: method})
    }


    const createOrder = async (e) =>{
        e.preventDefault()

        try {
            await sendOrder(form)
        } catch (error) {
            console.log(error);
            
        }
    }

    

  return (
    <>
        <div className={styles.container} onClick={() => setFormVisibility(false)}>
            <form className={styles.wrapper} onClick={(event) => event.stopPropagation()} onSubmit={(event) => createOrder(event)}>
                <h2 className={styles.caption}>Оформление заказа</h2>
                <ul className={styles.fields}>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Имя </div>
                        <input id="name" type="text" className={styles.fieldInput} placeholder="Иван" onChange={(event)=>handleChange(event)}/>
                        <div>От 3 символов</div>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Номер телефона</div>
                        <input id="phone" className={styles.fieldInput} type="text" placeholder='+375331234567' onChange={(event)=>handleChange(event)}/>
                        <div>Цифры от 0-9, символ + в начале, длина 12, код 29/33</div>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Адрес доставки</div>
                        <textarea id="address" className={styles.address} placeholder='Минск, улица Богдана Хмельницкого 46' onChange={(event)=>handleChange(event)}/>
                        <div>Строка длиной от 20 символов</div>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Выберите способ оплаты</div>
                        <ul className={styles.payments}>
                            <li className={payMethod === "card" ? styles.selected : styles.paymentType} onClick={() => changePayMethod("card")}>Картой курьеру</li>
                            <li className={payMethod === "cash" ? styles.selected : styles.paymentType} onClick={() => changePayMethod("cash")}>Наличными курьеру</li>
                        </ul>
                    </li>
                </ul>
                <div className={styles.bottom}>
                    <div className={styles.orderPrice}>Сумма корзины товаров: <span>{totalSum}</span> BYN</div>
                    <button type='submit' className={styles.button}>Отправить</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default OrderWindow
