import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="game">
            {!gameStarted ? (
                <StartScreen onStart={() => setGameStarted(true)} />
            ) : (
                <ChapterOne />
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

function ChapterOne() {
    const dialogues = [
        "Oh, here you are, hey Erin, finally you woke up :)",
        "Oh, I totally forgot to tell you who I am",
        "I would like to say I am Charlie and you are Emma but I can't",
        "because I am brown Mehmet :((",
        "Oh nooo!",
        "Tito is not at your apartment, where is he????",
        "we should find him",
        "Click the places to find a clue!"
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [foundClue, setFoundClue] = useState(false);

    //Developer debug mode to spam next button
    const [debugMode, setDebugMode] = useState(true);

    //Dialog sound
    const talkAudio = new Audio("/sounds/talk.wav");
    talkAudio.volume = 1;

    useEffect(() => {
        let dotInterval;
        let typeInterval;
        let dotTimeout;

        setDisplayText("");
        setIsTyping(true);
        setLoadingDots(".");

        dotInterval = setInterval(() => {
            setLoadingDots((prev) => {
                if (prev === "...") return ".";
                return prev + ".";
            });
        }, 250);

        dotTimeout = setTimeout(() => {
            clearInterval(dotInterval);
            setLoadingDots("");

            let charIndex = 0;
            const currentText = dialogues[dialogueIndex];

            typeInterval = setInterval(() => {
                setDisplayText(currentText.slice(0, charIndex + 1));
                talkAudio.currentTime = 0;
                talkAudio.play().catch(() => {});

                charIndex++;

                if (charIndex >= currentText.length) {
                    clearInterval(typeInterval);
                    setIsTyping(false);
                    talkAudio.pause();
                }
            }, 45);
        }, 700);

        return () => {
            clearInterval(dotInterval);
            clearInterval(typeInterval);
            clearTimeout(dotTimeout);
        };
    }, [dialogueIndex]);



    function nextDialogue() {
        if (isTyping && !debugMode) return;

        if (dialogueIndex === dialogues.length - 1 && !foundClue) {
            return;
        }

        if (dialogueIndex < dialogues.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        }
    }

    function findClue() {
        setFoundClue(true);
    }

    return (
        <div className="chapter-one">
            <img src="/room.png" className="room-bg" />

            <img src="/erin.png" className="erin-character" />

            {/* Hidden clickable spots */}

            <div className="hidden-spot spot1"></div>
            <div className="hidden-spot spot2"></div>
            <div className="hidden-spot spot3"></div>
            <div className="hidden-spot spot4"></div>
            <div className="hidden-spot spot5"></div>
            <div className="hidden-spot spot6"></div>
            <div className="hidden-spot spot7"></div>
            <div className="hidden-spot spot8"></div>
            <div className="hidden-spot spot9"></div>

            {/* REAL CLUE */}

            <button
                className="hidden-spot real-clue"
                onClick={findClue}
            ></button>

            {/* Clue notification */}

            {foundClue && (
                <div className="clue-found">
                    Clue Found!
                </div>
            )}

            <div className="dialogue-container">
                <img src="/dialogue.png" className="dialogue-image" />

                <div className="dialogue-text">
                    {loadingDots || displayText}
                </div>

                <button
                    className="next-button"
                    onClick={nextDialogue}
                    disabled={
                        (!debugMode && isTyping) ||
                        (dialogueIndex === dialogues.length - 1 && !foundClue)
                    }
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}


createRoot(document.getElementById("root")).render(<App />);