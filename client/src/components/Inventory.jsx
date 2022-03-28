import React from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

const Inventory = ({ array, setArray, fetchInventory, fetchOrders }) => {
        const initialValues = {
                name: "",
                price: "",
        };
        const initialValues2 = {
                price: "",
        };
        const addItem = async (data) => {
                console.log(data);
                await axios.post("http://localhost:3001/inventory", data);
                fetchInventory();
        };
        const updatePrice = async (data, id) => {
                console.log(data);
                await axios.put(`http://localhost:3001/inventory/${id}`, data);
                fetchInventory();
                fetchOrders();
        };
        const deleteItem = async (id) => {
                const isDeleted = await axios.delete(`http://localhost:3001/inventory/${id}`);

                if (!isDeleted.data.success) {
                        return alert("Item could not be deleted. Please try again.");
                }
                const values = array.filter((element) => element.id !== id);
                setArray(values);
        };
        const addToOrder = async (id) => {
                const data = { tableid: 1, orderid: 1, itemid: id };
                await axios.post("http://localhost:3001/orders/", data);
                fetchOrders();
        };

        return (
                <div className="">
                        <Formik
                                initialValues={initialValues}
                                onSubmit={(data, { resetForm }) => {
                                        addItem(data);
                                        resetForm();
                                }}
                        >
                                <Form autoComplete="off">
                                        <label htmlFor="">
                                                <h3>name:</h3>
                                        </label>
                                        <Field name="name" placeholder="Name.."></Field>
                                        <label htmlFor="">
                                                <h3>price:</h3>
                                        </label>
                                        <Field name="price" placeholder="Price.."></Field>
                                        <br />
                                        <button type="submit">ADD NEW ITEM</button>
                                </Form>
                        </Formik>
                        <ul>
                                {array.map((item, index) => {
                                        return (
                                                <li key={index}>
                                                        {item.name} for {item.price} Kc{" "}
                                                        <button onClick={() => deleteItem(item.id)}>DEL</button>
                                                        <button onClick={() => addToOrder(item.id)}>
                                                                Add to order
                                                        </button>
                                                        <Formik
                                                                initialValues={initialValues2}
                                                                onSubmit={(data, { resetForm }) => {
                                                                        updatePrice(data, item.id);
                                                                        resetForm();
                                                                }}
                                                        >
                                                                <Form autoComplete="off">
                                                                        <label htmlFor="">update price:</label>
                                                                        <Field
                                                                                name="price"
                                                                                placeholder="new price.."
                                                                        ></Field>
                                                                        <button type="submit">UPDATE</button>
                                                                </Form>
                                                        </Formik>
                                                </li>
                                        );
                                })}
                        </ul>
                </div>
        );
};

export default Inventory;
