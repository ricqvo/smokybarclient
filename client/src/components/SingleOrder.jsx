import React, { useState } from "react";

const SingleOrder = ({ order, array }) => {
        const [category, setCategory] = useState("Shisha");
        const catSetter = (cat) => {
                setCategory(cat);
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
                                                                        <div
                                                                                key={index + item.id}
                                                                                className="font-bold flex text-black border-2 border-black p-3 w-[170px] m-2 flex-wrap items-center justify-center"
                                                                        >
                                                                                {item.name}
                                                                        </div>
                                                                )
                                                        );
                                                })}
                                        </div>
                                </div>
                        </div>
                        <div className="w-[20vw] h-auto bg-black"></div>
                        <div className="w-[15vw] h-auto bg-white"></div>
                        <div className="w-[15vw] h-auto bg-black"></div>
                </div>
        );
};

export default SingleOrder;
