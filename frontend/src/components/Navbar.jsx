import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(`/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        }).then(() => {
            localStorage.setItem("isAuthenticated", JSON.stringify(false));
            navigate("/", { replace: true });
        });
    };

    return (
        <nav className="bg-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">Expense Calculator</Link>
                <div>
                    {isAuthenticated ? (
                        <>
                            <Link to="/expenses" className="text-white mr-4">Expenses</Link>
                            <button onClick={handleLogout} className="text-white">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="text-white mr-4">Login</Link>
                            <Link to="/signup" className="text-white">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;