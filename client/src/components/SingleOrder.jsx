import React, { useEffect, useState } from "react";
import axios from "axios";

const SingleOrder = ({ order, array }) => {
        const [category, setCategory] = useState("Shisha");
        const [orders, setOrders] = useState([]);
        const [sum, setSum] = useState(0);
        const [rtp, setRtp] = useState(false);
        const rtpStyle = `font-bold text-2xl  border-2 mt-3 mx-1 ${
                !rtp ? "border-green-500 text-green-500" : "border-green-500 text-white bg-green-500"
        }`;
        const rtpSet = () => {
                setRtp(!rtp);
        };

        const fetchOrders = async () => {
                await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`).then((res) => {
                        setOrders(res.data);
                        console.log(res.data);
                });
        };
        useEffect(() => {
                fetchOrders();
        }, []);
        const catSetter = (cat) => {
                setCategory(cat);
        };

        const onClick = async (item) => {
                const newItem = {
                        orderid: order.orderid,
                        itemid: item.id,
                        tobepaid: false,
                        paid: false,
                };
                await axios.post("https://project-smokybar.herokuapp.com/orders", newItem);
                const newArray = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);
                console.log(newArray);
                setOrders(newArray.data);
        };
        const duplicate = async (thisOrder) => {
                console.log(thisOrder);
                const newItem = {
                        orderid: order.orderid,
                        itemid: thisOrder.item.id,
                        tobepaid: false,
                        paid: false,
                };
                await axios.post("https://project-smokybar.herokuapp.com/orders", newItem);
                const newArray = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);
                console.log(newArray);
                setOrders(newArray.data);
        };
        const deleteItem = async (order) => {
                setOrders(orders.filter((e) => e.orderId !== order.orderId));
                await axios.delete(`https://project-smokybar.herokuapp.com/orders/${order.orderId}`);
        };
        const updatePayment = async (thisOrder) => {
                await axios.put(`https://project-smokybar.herokuapp.com/orders/${thisOrder.orderId}`, {
                        tobepaid: !thisOrder.tobepaid,
                });
                const newArray = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);
                console.log(newArray);
                setOrders(newArray.data);
                let sumArray = [];
                newArray.data.forEach((order) => {
                        if (!order.paid && order.tobepaid) {
                                sumArray = [...sumArray, order];
                        }
                });
                setSum(0);
                let sumTemp = 0;
                sumArray.forEach((order) => {
                        sumTemp += parseInt(order.item.price);
                });
                setSum(sumTemp);
        };
        const updatePaid = async (thisOrder) => {
                await axios.put(`https://project-smokybar.herokuapp.com/orders/${thisOrder.orderId}`, { paid: true });
                const newArray = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);
                setOrders(newArray.data);
        };

        const reset = () => {
                setSum(0);
                setRtp(!rtp);
        };
        const payItems = async () => {
                const newArray = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);

                let doneCheck2 = 0;
                if (rtp) {
                        newArray.data.forEach(async (order) => {
                                if (order.tobepaid && !order.paid) {
                                        await updatePaid(order);
                                }
                        });
                        reset();
                } else {
                        console.log("not ready to pay");
                }
                const newArray2 = await axios.get(`https://project-smokybar.herokuapp.com/orders/${order.orderid}`);
                let doneCheck = newArray2.data.length;
                newArray2.data.forEach((or) => {
                        if (or.paid || or.tobepaid) {
                                doneCheck2 += 1;
                        }
                });
                console.log(doneCheck + "===" + doneCheck2);

                if (doneCheck === doneCheck2) {
                        await axios.put(`https://project-smokybar.herokuapp.com/ordername/${order.orderid}`, {
                                done: true,
                        });
                }
        };

        return (
                <div className="flex min-h-[70vh]">
                        <div className="w-[50vw]  bg-white">
                                <div className="flex flex-col">
                                        <div className="w-[100%] bg-slate-500 flex justify-center items-center">
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Shisha" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Shisha");
                                                        }}
                                                >
                                                        Shisha
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Non-alcoholic" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Non-alcoholic");
                                                        }}
                                                >
                                                        Non-alc
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Beer-Wine-Cider" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Beer-Wine-Cider");
                                                        }}
                                                >
                                                        BWC
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Drink-alcoholic" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Drink-alcoholic");
                                                        }}
                                                >
                                                        Drink-alc
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Drink-non-alcoholic" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Drink-non-alcoholic");
                                                        }}
                                                >
                                                        Drink-nonAlc
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Shot" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Shot");
                                                        }}
                                                >
                                                        Shot
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Bucket" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Bucket");
                                                        }}
                                                >
                                                        Bucket
                                                </button>
                                                <button
                                                        className={`flex justify-center items-center border-2 border-black text-black bg-white font-bold m-2 p-2 ${
                                                                category === "Other" && "bg-green-500"
                                                        }`}
                                                        onClick={() => {
                                                                catSetter("Other");
                                                        }}
                                                >
                                                        Other
                                                </button>
                                        </div>
                                        <div className="m-2 text-white flex-col items-center justify-center">
                                                {array.map((item, index) => {
                                                        return (
                                                                item.type === category && (
                                                                        <button
                                                                                onClick={() => {
                                                                                        onClick(item);
                                                                                }}
                                                                                key={
                                                                                        index +
                                                                                        item.id +
                                                                                        item.type +
                                                                                        item.name +
                                                                                        item.price
                                                                                }
                                                                                className="font-bold flex text-black border-2 border-black p-3 w-[170px] m-2 flex-wrap items-center justify-center"
                                                                        >
                                                                                {item.name}
                                                                        </button>
                                                                )
                                                        );
                                                })}
                                        </div>
                                </div>
                        </div>
                        <div className="w-[20vw] h-auto bg-white border-2 border-black">
                                <div className="flex flex-col justify-center items-center">
                                        <div className=" font-bold text-2xl  border-b-2 border-slate-500 text-slate-500">
                                                ORDERED ITEMS:
                                        </div>
                                        {orders.map((order, index) => {
                                                return (
                                                        !order.paid &&
                                                        !order.tobepaid && (
                                                                <div
                                                                        className="flex m-2"
                                                                        key={
                                                                                order.orderId +
                                                                                index +
                                                                                order.item.name +
                                                                                index
                                                                        }
                                                                >
                                                                        <button
                                                                                className=" text-3xl text-red-500 font-bold  mr-9 bg-slate-500 px-2"
                                                                                onClick={() => {
                                                                                        console.log(order);
                                                                                        deleteItem(order);
                                                                                }}
                                                                        >
                                                                                X
                                                                        </button>
                                                                        <button
                                                                                onClick={() => {
                                                                                        console.log({ order });
                                                                                        duplicate(order);
                                                                                }}
                                                                                className="text-xl font-bold flex-grow text-black
                                                                 p-1"
                                                                        >
                                                                                {order.item.name}
                                                                        </button>
                                                                        <button
                                                                                className=" text-3xl text-green-500 font-bold  ml-9 bg-slate-500 px-2"
                                                                                onClick={() => {
                                                                                        console.log(order);
                                                                                        updatePayment(order);
                                                                                }}
                                                                        >
                                                                                P
                                                                        </button>
                                                                </div>
                                                        )
                                                );
                                        })}
                                </div>
                        </div>
                        <div className="w-[15vw] h-auto bg-white border-2 border-black">
                                {" "}
                                <div className="flex flex-col justify-center items-center">
                                        <div className=" font-bold text-2xl  border-b-2 border-slate-500 text-slate-500">
                                                SUM: {sum} kc
                                        </div>
                                        <div>
                                                <button className={rtpStyle} onClick={rtpSet}>
                                                        READY
                                                </button>
                                                <button
                                                        className=" font-bold text-2xl  border-2 mt-3 border-red-500 text-red-500 mx-1"
                                                        onClick={payItems}
                                                >
                                                        PAY
                                                </button>
                                        </div>

                                        {orders.map((order, index) => {
                                                return (
                                                        order.tobepaid &&
                                                        !order.paid && (
                                                                <div
                                                                        className="flex m-2"
                                                                        key={
                                                                                order.orderId +
                                                                                index +
                                                                                order.item.name +
                                                                                index
                                                                        }
                                                                >
                                                                        <button
                                                                                className=" text-3xl text-red-500 font-bold  mr-9 bg-slate-500 px-2"
                                                                                onClick={() => {
                                                                                        console.log(order);
                                                                                        updatePayment(order);
                                                                                }}
                                                                        >
                                                                                X
                                                                        </button>
                                                                        <div
                                                                                className="text-xl font-bold flex-grow text-black
                                                                 p-1"
                                                                        >
                                                                                {order.item.name}
                                                                        </div>
                                                                </div>
                                                        )
                                                );
                                        })}
                                </div>
                        </div>
                        <div className="w-[15vw]  h-auto bg-white border-2 border-black">
                                <div className="flex flex-col justify-center items-center">
                                        <div className=" font-bold text-2xl  border-b-2 border-slate-500 text-slate-500">
                                                PAID:
                                        </div>
                                        {orders.map((order, index) => {
                                                return (
                                                        order.paid && (
                                                                <div
                                                                        className="flex m-2"
                                                                        key={
                                                                                order.orderId +
                                                                                index +
                                                                                order.item.name +
                                                                                index
                                                                        }
                                                                >
                                                                        <div
                                                                                className="text-xl font-bold flex-grow text-black
                                                                 p-1"
                                                                        >
                                                                                {order.item.name}
                                                                        </div>
                                                                </div>
                                                        )
                                                );
                                        })}
                                </div>
                        </div>
                </div>
        );
};

export default SingleOrder;
