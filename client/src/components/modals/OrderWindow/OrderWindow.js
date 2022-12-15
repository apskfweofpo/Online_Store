
import axios from 'axios';
import React from 'react'


import styles from './OrderWindow.module.scss'


const OrderWindow = ({setFormVisibility}) => {

    const [payMethod, setPayMethod] = React.useState("card");

    const sendOrder = async (orderParams) => {
        const {name, phone, address, comment, paymentType, price, description} = orderParams;
        
        await axios.post(`http://localhost:8080/orders`,
        {params: {
            description,
            name,
            phone,
            address,
            comment,
            price,
            paymentType
        }})
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
        comment: "",
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
            sendOrder(form)
        } catch (error) {
            console.log(error);
            
        }
    }

    

  return (
    <>
        <div className={styles.container} onClick={() => setFormVisibility(false)}>
            <form className={styles.wrapper} onClick={(event) => event.stopPropagation()} onSubmit={(event) => createOrder(event)}>
                <h2 className={styles.caption}>Заполните данные</h2>
                <ul className={styles.fields}>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Ваше имя *</div>
                        <input id="name" type="text" className={styles.fieldInput} placeholder="Егор" onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Номер телефона *</div>
                        <input id="phone" className={styles.fieldInput} type="text" placeholder='+375(XX)123-45-67' onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Адрес доставки *</div>
                        <textarea id="address" className={styles.address} placeholder='улица Сурганова 37/2, кв. 12' onChange={(event)=>handleChange(event)}/>
                    </li>
                    <li className={styles.field}>
                        <div className={styles.fieldName}>Комментарии к заказу</div>
                        <textarea id="comment" className={styles.comment} placeholder="Побольше салфеток и побыстрее!" onChange={(event)=>handleChange(event)}/>
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
                    <div className={styles.orderPrice}>Сумма заказа: <span> </span> ₽</div>
                    <button type='submit' className={styles.button}>Заказать</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default OrderWindow
