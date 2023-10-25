import { AddToCartIcon, RemoveFromCartIcon } from '../Icons.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Card, Button } from 'react-bootstrap';
import "./Products.css"
import { Category } from '../Filters/Category.jsx';
import { CreateProduct } from '../CreateProduct/CreateProduct.jsx';
import { GenerarPago } from '../GenerarPago/GenerarPago.jsx';

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };
  

  return (
    <main  className="col-10 products bg-black container mt-4">
      <Category/>
      
      <div className="row">
      <CreateProduct/>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);
          
          return (
            <div key={product.id} className="col-md-3 mb-4">
              <Card className='card' bg='dark' >
                <Card.Img className='card-image' variant="top" src={product.thumbnail} alt={product.title} />
                <Card.Body className='text-light'>
                  <Card.Title className=''>{product.title}</Card.Title>
                  <Card.Text className=''>${product.price}</Card.Text>

                    <GenerarPago/>

                    <Button className='btn btn-md m-2'
                      onClick={() => {
                      isProductInCart ? removeFromCart(product) : addToCart(product);
                    }}
                    variant={isProductInCart ? 'danger' : 'success'}
                  >
                    {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                    {isProductInCart ? 'Remove' : 'Add'}
                  </Button>

                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </main>
  );
}
