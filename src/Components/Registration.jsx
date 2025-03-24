import React, { useState, useEffect } from "react";
import "../assets/registration.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userSlice";


export function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: ""
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();





    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!formData.email.includes("@")) {
            newErrors.email = "Email must contain '@'";
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
        }
        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        } else {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            if (age < 18) {
                newErrors.dob = "You must be at least 18 years old to register.";
            }
        }

        if (!formData.gender) newErrors.gender = "Please select a gender";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Retrieve existing users from localStorage
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

            // Check if email is already registered
            const emailExists = storedUsers.some(user => user.email === formData.email);
            if (emailExists) {
                setErrors({ email: "Email is already registered!" });
                return;
            }

            // Add new user to the array
            const updatedUsers = [...storedUsers, formData];

            // Save updated users list to localStorage
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Dispatch user to Redux store
            dispatch(registerUser(formData));

            // Show success message
            alert("Registration successful!");

            // Redirect to login page
            navigate("/login");
        }
    };

    return (
        <div className="login_card">
            <div className="container">
                <div className="reg_left_container">
                    <h1>Welcome to</h1>
                    <div className="circle-container">
                        <FontAwesomeIcon icon={faRocket} className="rocket-icon" />
                    </div>
                    <h2>Spacer</h2>
                    <p>
                        We specialize in creating excellent web and mobile applications that
                        drive growth and innovation. From ideation to execution, our expert
                        team delivers reflexive, high-performance solutions designed to meet
                        your unique business necessities.
                    </p>
                </div>
                <div className="reg_right_container">
                    <h1>Create your account</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}

                        <label htmlFor="email">E-mail Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}

                        <label htmlFor="password">Password</label>
                        <div className="password-container" style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                                onClick={handleShowPassword}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "#777",
                                }}
                            />
                        </div>
                        {errors.password && <p className="error-message">{errors.password}</p>}

                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            max={new Date().toISOString().split("T")[0]}
                        />
                        {errors.dob && <p className="error-message">{errors.dob}</p>}

                        <div className="gender-container">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="error-message">{errors.gender}</p>}
                        </div>

                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms" className="tc_text">
                                By signing up, I agree to the
                                <a href="#" className="link"> Terms & Conditions</a>
                            </label>
                        </div>

                        <div className="two_btn">
                            <button className="create-btn" type="submit">Create</button>
                            <button className="l-btn" type="button" onClick={() => navigate("/login")} >Login</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default RegistrationForm;
