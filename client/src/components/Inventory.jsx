import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";

const Inventory = ({ array, setArray, fetchInventory }) => {
        const [category, setCategory] = useState("Shisha");
        const changeCategory = (newCat) => {
                setCategory(newCat.cat);
        };
        const initialValues = {
                name: "",
                price: "",
                type: "Shisha",
        };
        const initialValues2 = {
                price: "",
        };
        const initialValues3 = { cat: "Shisha" };
        const addItem = async (data) => {
                const newItem = {
                        name: data.name,
                        price: data.price,
                        type: category,
                };
                console.log(newItem);
                await axios.post("https://project-smokybar.herokuapp.com/inventory", newItem);
                fetchInventory();
        };
        const updatePrice = async (data, id) => {
                console.log(data);
                await axios.put(`https://project-smokybar.herokuapp.com/inventory/${id}`, data);
                fetchInventory();
        };
        const deleteItem = async (id) => {
                const isDeleted = await axios.delete(`https://project-smokybar.herokuapp.com/inventory/${id}`);

                if (!isDeleted.data.success) {
                        return alert("Item could not be deleted. Please try again.");
                }
                const values = array.filter((element) => element.id !== id);
                setArray(values);
        };

        return (
                <div className="max-w-[90vw] m-auto">
                        <Formik
                                initialValues={initialValues3}
                                onSubmit={(data) => {
                                        changeCategory(data);
                                }}
                        >
                                <Form className="m-2 border-2 font-bold p-2 flex justify-center items-center">
                                        <label htmlFor="" className="font-bold text-xl p-2">
                                                <h3>Chosen category: </h3>
                                        </label>
                                        <Field name="cat" component="select" className="m-2 text-xl p-2">
                                                <option value="Shisha">Shisha</option>
                                                <option value="Non-alcoholic">Non-alcoholic</option>
                                                <option value="Beer-Wine-Cider">Beer-Wine-Cider</option>
                                                <option value="Drink-alcoholic">Drink-alcoholic</option>
                                                <option value="Drink-non-alcoholic">Drink-non-alcoholic</option>
                                                <option value="Shot">Shot</option>
                                                <option value="Bucket">Bucket</option>
                                                <option value="Other">Other</option>
                                        </Field>
                                        <button type="submit" className="m-2 border-2 font-bold p-2">
                                                CHANGE CATEGORY
                                        </button>
                                </Form>
                        </Formik>
                        <Formik
                                initialValues={initialValues}
                                onSubmit={(data, { resetForm }) => {
                                        addItem(data);
                                        resetForm();
                                }}
                        >
                                <Form
                                        autoComplete="off"
                                        className="m-2 border-2 font-bold p-2 flex justify-center items-center"
                                >
                                        <label htmlFor="" className="font-bold text-xl p-2">
                                                <h3>name:</h3>
                                        </label>
                                        <Field name="name" placeholder="Name.." className="m-2 text-xl p-2"></Field>
                                        <label htmlFor="" className="font-bold text-xl p-2">
                                                <h3>price:</h3>
                                        </label>
                                        <Field name="price" placeholder="Price.." className="m-2 text-xl p-2"></Field>
                                        <br />
                                        <button type="submit" className="m-2 border-2 font-bold p-2">
                                                ADD NEW ITEM
                                        </button>
                                </Form>
                        </Formik>

                        <div className="m-2 text-white flex-col items-center justify-center">
                                {array.map((item, index) => {
                                        return (
                                                item.type === category && (
                                                        <div
                                                                key={index}
                                                                className="bg-slate-500 border-2 p-5 flex w-[100%]"
                                                        >
                                                                <div className="text-3xl font-bold flex-grow text-white border-r-2 border-white p-3">
                                                                        {item.name}{" "}
                                                                        <div className=" font-normal text-white">
                                                                                for{" "}
                                                                        </div>
                                                                        {item.price} Kc
                                                                </div>
                                                                <div className="flex items-center justify-center">
                                                                        <div className="">
                                                                                <Formik
                                                                                        initialValues={initialValues2}
                                                                                        onSubmit={(
                                                                                                data,
                                                                                                { resetForm }
                                                                                        ) => {
                                                                                                updatePrice(
                                                                                                        data,
                                                                                                        item.id
                                                                                                );
                                                                                                resetForm();
                                                                                        }}
                                                                                >
                                                                                        <Form
                                                                                                autoComplete="off"
                                                                                                className="m-2 font-bold"
                                                                                        >
                                                                                                <label className="font-bold text-xl ">
                                                                                                        New price:
                                                                                                </label>
                                                                                                <Field
                                                                                                        name="price"
                                                                                                        placeholder="new price.."
                                                                                                        className="m-2 text-xl text-black align-middle text-center"
                                                                                                ></Field>
                                                                                                <button
                                                                                                        type="submit"
                                                                                                        className="m-2 border-2 font-bold p-2 bg-green-600"
                                                                                                >
                                                                                                        UPDATE PRICE
                                                                                                </button>
                                                                                        </Form>
                                                                                </Formik>
                                                                        </div>
                                                                        <div className="">
                                                                                <button
                                                                                        className="m-2 border-2 font-bold p-2 bg-red-600"
                                                                                        onClick={() =>
                                                                                                deleteItem(item.id)
                                                                                        }
                                                                                >
                                                                                        DELETE ITEM
                                                                                </button>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                )
                                        );
                                })}
                        </div>
                </div>
        );
};

export default Inventory;
