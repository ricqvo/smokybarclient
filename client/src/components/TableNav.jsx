import React from "react";
import { NavLink } from "react-router-dom";

const TableNav = () => {
        return (
                <div className="w-screen bg-slate-500 text-white font-bold flex items-center justify-center">
                        <div className="m-4 ">TABLES:</div>
                        <div className="m-4">
                                <NavLink to="/table1" activeStyle={{ color: "black" }}>
                                        ONE
                                </NavLink>
                        </div>
                        <div className="m-4">
                                <NavLink to="/table2" activeStyle={{ color: "black" }}>
                                        TWO
                                </NavLink>
                        </div>
                        <div className="m-4">
                                <NavLink to="/table3" activeStyle={{ color: "black" }}>
                                        THREE
                                </NavLink>
                        </div>
                        <div className="m-4">
                                <NavLink to="/table4" activeStyle={{ color: "black" }}>
                                        FOUR
                                </NavLink>
                        </div>
                        <div className="m-4">
                                <NavLink to="/table5" activeStyle={{ color: "black" }}>
                                        FIVE
                                </NavLink>
                        </div>
                        <div className="m-4">
                                <NavLink to="/table6" activeStyle={{ color: "black" }}>
                                        SIX
                                </NavLink>
                        </div>
                </div>
        );
};

export default TableNav;
