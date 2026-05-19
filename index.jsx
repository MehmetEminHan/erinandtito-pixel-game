import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="game">
            {!gameStarted ? (
                <StartScreen onStart={() => setGameStarted(true)} />
            ) : (
                <GameScreen />
            )}
        </div>
    );
}

function StartScreen({ onStart }) {
    return (
        <div className="start-screen">
            <img src="/start.png" className="start-bg" />

            <button className="start-button" onClick={onStart}>
                START GAME
            </button>
        </div>
    );
}

function GameScreen() {
    return (
        <div className="game-screen">
            <h1>Chapter 1</h1>
            <p>The night begins on the rooftop...</p>

            <div className="dialogue-box">
                <strong>Erin</strong>
                <p>Tito... do you think memories can live inside the stars?</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);