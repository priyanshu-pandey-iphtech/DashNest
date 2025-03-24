import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./assets/cards.css";

import Registration from "./Components/Registration";
import LoginPage from "./Components/LoginPage";
import Cards from "./Components/Cards";
import Counter from "./Components/Counter";
import Todo from "./Components/Todo";
import MovieList from "./Components/MovieList";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <>
            <Route path="/cards" element={isLoggedIn ? <Cards onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/movie_list" element={<MovieList />} />
          </>
        ) : null}

        {/* Catch-All Route */}
        <Route path="*" element={!isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/cards" />} />

      </Routes>
    </Router>
  );
}

export default App;
