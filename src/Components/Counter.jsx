import React, { useState } from 'react';
import "../assets/counter.css";
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";


const Counter = () => {
    const [count, setCount] = useState("");
    const [dcount, setDcount] = useState("");
    const navigate = useNavigate();

    const handleDecimalChange = (e) => {
        let value = e.target.value;

        if (value === "") {
            setDcount(""); // Allow clearing input
            return;
        }

        // Allow user to type valid numbers including decimals
        if (!isNaN(value) && /^-?\d*\.?\d*$/.test(value)) {
            setDcount(value);
        }
    };

    return (
        <>


            <div className='counter-heading'>
                <button className='back_btn' onClick={() => navigate("/")}> <IoChevronBack />Back</button >
                <h1>Counter App</h1>
            </div >





            <div className='both_counter'>

                {/* Integer Counter */}
                <div className='integer_counter_container'>
                    <h2 className='integer_counter'>Integer Counter</h2>
                    <div className='int_counter'>
                        <button className="plus_btn" onClick={() => setCount((prev) => (prev === "" ? 1 : prev + 1))}>+</button>
                        <input
                            className="user_input"
                            type="number"
                            value={count}
                            placeholder='0'
                            onChange={(e) => {
                                const value = Math.floor(Number(e.target.value));
                                if (value >= 0) setCount(value);
                            }}
                        />
                        <button
                            className="minus_btn"
                            onClick={() => setCount((prev) => (prev > 0 ? prev - 1 : 0))}
                            disabled={count === 0 || count === ""}
                        >
                            -
                        </button>
                    </div>
                    <div className='reset_btn_alignment'>
                        <button className="reset_btn" onClick={() => setCount("")}>Reset</button>
                    </div>
                </div>

                {/* Decimal Counter */}
                <div className='decimal_counter_container'>
                    <h2 className='integer_counter'>Decimal Counter</h2>
                    <div className='int_counter'>
                        <button
                            className="plus_btn"
                            onClick={() => setDcount((prev) => parseFloat((parseFloat(prev || 0) + 0.1).toFixed(1)))}
                        >
                            +
                        </button>
                        <input
                            className="user_input"
                            type="text"
                            step="0.1"
                            value={dcount}
                            placeholder='0.0'
                            onChange={handleDecimalChange}
                        />
                        <button
                            className="minus_btn"
                            onClick={() => setDcount((prev) => parseFloat((parseFloat(prev || 0) - 0.1).toFixed(1)))}
                            disabled={parseFloat(dcount || 0) <= 0}
                        >
                            -
                        </button>
                    </div>
                    <div className='reset_btn_alignment'>
                        <button className="reset_btn" onClick={() => setDcount("")}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Counter;

