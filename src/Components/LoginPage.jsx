import React, { useState } from "react";
import "../assets/loginpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";

export function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!formData.email.includes("@")) {
            newErrors.email = "Email must contain '@'";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;


        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];


        const existingUser = storedUsers.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (!existingUser) {
            setErrors({ email: "Invalid email or password" });
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
        localStorage.setItem("isLoggedIn", "true");

        dispatch(loginUser(existingUser));
        navigate("/cards");
        console.log("Login Successfull")

    };

    return (
        <form onSubmit={handleSubmit}>
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

            <div className="checkbox-container">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="tc_text">
                    By logging in, I agree to the
                    <a href="#" className="link"> Terms & Conditions</a>
                </label>
            </div>

            <div className="two_btn">
                <button className="login-btn" type="submit">Login</button>
                <button className="sign-up-btn" type="button" onClick={() => navigate("/register")}>Sign Up</button>
            </div>
        </form>
    );
}

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("isLoggedIn", "true");

        navigate("/cards");

    };

    return (
        <div className="login_card">
            <div className="container">
                <div className="left_container">
                    <h1 className="heading">Welcome to</h1>
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
                <div className="right_container">
                    <h1 className="heading">Login to your account</h1>
                    <LoginForm onLogin={handleLogin} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
