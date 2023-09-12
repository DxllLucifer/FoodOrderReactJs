import React,{useState} from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './Store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const showCartHandler = () =>{
    setCartIsShown(true)
  }
  const hideCartHandler = () =>{
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} onHideCart={hideCartHandler} />
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
