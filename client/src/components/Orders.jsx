import React, { useState, useEffect } from "react";

const Orders = ({ orderList, fetchOrders }) => {
        useEffect(() => {
                fetchOrders();
        }, []);

        return (
                <div>
                        <h1>Order 1/1:</h1>
                        <ul>
                                {orderList.map((item, index) => {
                                        return (
                                                <li key={index}>
                                                        {item.name} for {item.price}
                                                </li>
                                        );
                                })}
                        </ul>
                </div>
        );
};

export default Orders;
