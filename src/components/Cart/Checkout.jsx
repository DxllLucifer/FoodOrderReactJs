import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isSixChar = value=> value.trim().length === 6;

const Checkout = (props) => {
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const [formInputValidity, setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isSixChar(enteredPostal)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

    if (!formIsValid) {
        return
    }
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostal
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid }`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter Valid Name</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street ? '' : classes.invalid }`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter Valid Street</p>}

      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid }`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'ref={postalInputRef} />
        {!formInputValidity.postalCode && <p>Please enter Valid Postal Code</p>}

      </div>
      <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid }`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter Valid City</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;