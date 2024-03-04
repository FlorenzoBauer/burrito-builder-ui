import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, createOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";


function App() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
    .then( data => setOrders(data.orders))
    .catch((err) => console.error("Error fetching:", err));
  }, []);

  const addOrder = (newOrder) => {
    createOrder(newOrder)
      .then(setOrders([...orders, newOrder]))
      .catch((err) => console.error("Error creating order:", err));
  };


  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm  addOrder={addOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
