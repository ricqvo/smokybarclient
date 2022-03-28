import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";

function App() {
        const [array, setArray] = useState([]);
        const [orderList, setOrderList] = useState([]);

        const fetchInventory = async () => {
                await axios.get("http://localhost:3001/inventory").then((res) => {
                        setArray(res.data);
                        console.log(res.data);
                });
        };
        const fetchOrders = async () => {
                await axios.get("http://localhost:3001/orders/1/1").then((res) => {
                        setOrderList(res.data);
                        console.log(res.data);
                });
        };

        useEffect(() => {
                fetchInventory();
        }, []);
        return (
                <>
                        <Inventory
                                array={array}
                                setArray={setArray}
                                fetchInventory={fetchInventory}
                                orderList={orderList}
                                setOrderList={setOrderList}
                                fetchOrders={fetchOrders}
                        />
                        <Orders orderList={orderList} setOrderList={setOrderList} fetchOrders={fetchOrders} />
                </>
        );
}

export default App;
