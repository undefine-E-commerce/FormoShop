import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartIcon, ClearCartIcon } from '../../Components/Icons';
import { useCart } from '../../hooks/useCart.js';
import "./Cart.css"

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
    return (
      <li className='container text-center row justify-content-center'>
        <img className='cart-image' src={thumbnail} alt={title} />
        <div>
          <strong className='text-white'>{title}</strong>
          <p className='text-white'> - ${price}</p>
        </div>
        <footer>
          <small className='text-white'>Cantidad: {quantity}</small>
          <button onClick={addToCart}>+</button>
        </footer>
      </li>
    );
  }

export function Cart() {


  const [show, setShow] = useState(false);
  const { cart, clearCart, addToCart } = useCart();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <CartIcon/>
      </Button>

      <Offcanvas show={show}  placement='end' onHide={handleClose}>
        <Offcanvas.Header className='bg-dark text-white' closeButton>
          <Offcanvas.Title>NewCart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='bg-dark text-white'>
            <ul>
                {cart.map((product) =>(
                    <CartItem 
                    key={product.id}
                    addToCart={()=>addToCart(product)}{...product}
                    />
                ))}
            </ul>
            <Button variant="danger" onClick={clearCart}>
            <ClearCartIcon /> Clear Cart
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

