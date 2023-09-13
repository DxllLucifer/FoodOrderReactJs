import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../Store/cart-context'
import classes from './HeaderCartButton.module.css'

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const [btnIsHighLighted, setBtnISHightLighted] = useState(false)
  const {items} = cartCtx

  const numberOfCartItems = items.reduce((curNumber,item)=>{
    return curNumber + item.amount
  }, 0 )


  const btnClasses = `${classes.button} ${btnIsHighLighted? classes.bump : ''}`


  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnISHightLighted(true);
    const timer = setTimeout(() => {
    setBtnISHightLighted(false);
    }, 300);
  
    return () =>{
      clearTimeout(timer)
    }

  }, [items])
  

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge} >{numberOfCartItems}</span>
    </button>
  )
}
