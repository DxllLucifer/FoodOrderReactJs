import React, { useContext } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../Store/cart-context'
import CartItem from './CartItem'
export default function Cart(props) {
    const cartCtx = useContext(CartContext)
    
    const totalAmount = cartCtx.totalAmount.toFixed(2)
    const hasItems = cartCtx.items.length > 0

    const carItemRemoveHandler = (id)=>{
      cartCtx.removeItem(id)
    }
    const carItemAddHandler = (item)=>{
      debugger
      cartCtx.addItem({...item , amount:1})
    }
    

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
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}
