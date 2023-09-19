import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

export default function Cart(props) {
    const cartCtx = useContext(CartContext)
    const [isCheckout, setIsCheckout] = useState(false)
    
    const totalAmount = cartCtx.totalAmount.toFixed(2)
    const hasItems = cartCtx.items.length > 0

    const carItemRemoveHandler = (id)=>{
      cartCtx.removeItem(id)
    }
    const carItemAddHandler = (item)=>{
      debugger
      cartCtx.addItem({...item , amount:1})
    }
    const orderHandler = ()=>{
      setIsCheckout(true)
    }
    const submitOrderHandler = (userData)=>{
      fetch('https://food-order-webapp-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json',{
        method:'POST',
        body:JSON.stringify({
          user:userData,
          orderdItem:cartCtx.items
        }),

      })
    }
    const ModalAction = <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
        </div>
    
    const cartItem = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item)=> (
      <li>
        <CartItem 
          key={item.id} 
          name={item.name} 
          amount = {item.amount} 
          price={item.price} 
          onRemove = {carItemRemoveHandler.bind(null, item.id)} 
          onAdd={carItemAddHandler.bind(null , item)} />
      </li>
      ))}
      </ul>
      );

  return (
    <Modal onHideCart= {props.onHideCart}>
        {cartItem}
        <div className={classes.total}>
            <span>totalAmount</span>
            <span>₹ {totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} />}
        {!isCheckout && ModalAction}
        
    </Modal>
  )
}
