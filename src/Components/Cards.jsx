import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const Cards = ({ onLogout }) => {
    const navigate = useNavigate();


    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [navigate]);

    const cardData = [
        { title: "Counter App", backgroundColor: "#0b4fa4", color: "white", path: "/counter" },
        { title: "ToDo List", backgroundColor: "white", color: "#0b4fa4", path: "/todo" },
        { title: "Movies Search App", backgroundColor: "#0b4fa4", color: "white", path: "/movie_list" },
        { title: "Fourth Demo Project", backgroundColor: "white", color: "#0b4fa4" },
        { title: "Fifth Demo Project", backgroundColor: "#0b4fa4", color: "white" },
        { title: "Sixth Demo Project", backgroundColor: "white", color: "#0b4fa4" }
    ];

    return (
        <>
            <div className="btn-container">
                <button
                    className="btn-login"
                    onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        localStorage.removeItem("loggedInUser");

                        console.log("User logged out, navigating to login page...");

                        if (onLogout) {
                            onLogout();
                        }

                        navigate("/");
                    }}
                >
                    <IoChevronBack /> Logout
                </button>
            </div>
            <h1 className="heading-demo_task_page">My Demo Projects</h1>
            <div className="card_component">
                {cardData.map((card, index) => {
                    const isWhite = card.backgroundColor === "white";
                    const cardClass = isWhite ? "white-card" : "blue-card";

                    return (
                        <div
                            key={index}
                            className={`card ${cardClass}`}
                            style={{ backgroundColor: card.backgroundColor, color: card.color }}
                            onClick={() => card.path ? navigate(card.path) : alert("No route defined!")}
                        >
                            <h2>{card.title}</h2>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Cards;
