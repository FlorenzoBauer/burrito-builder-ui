import React from "react";
import "./Orders.css";

const Orders = ({orders}) => {
  console.log('these are the orders: ', orders)

  const orderEls = orders.map(order => {
    return (
      <div id={order.id} className="order" key={order.id}>
        <h3 className="order-name">{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li className='ingredient-name' key={index}>{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

    return (
      <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
    );

};

export default Orders;
