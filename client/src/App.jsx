import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Inventory from "./components/Inventory";
import Orders from "./components/Orders";
import Navbar from "./components/Navbar";

function App() {
        const [array, setArray] = useState([]);

        const fetchInventory = async () => {
                await axios.get("https://project-smokybar.herokuapp.com/inventory").then((res) => {
                        setArray(res.data);
                        console.log(res.data);
                });
        };

        useEffect(() => {
                fetchInventory();
        }, []);
        return (
                <Router>
                        <Navbar />
                        <Switch>
                                <Route exact path="/orders">
                                        <Orders array={array} />
                                </Route>
                                <Route exact path="/inventory">
                                        <Inventory array={array} setArray={setArray} fetchInventory={fetchInventory} />
                                </Route>
                        </Switch>
                </Router>
        );
}

export default App;
