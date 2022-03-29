import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
        return (
                <div className="w-screen bg-white flex items-center justify-center font-bold">
                        <div className="m-4">
                                <Link to="/orders">ORDERS</Link>
                        </div>
                        <div className="m-4">
                                <Link to="/inventory">INVENTORY</Link>
                        </div>
                </div>
        );
};

export default Navbar;
