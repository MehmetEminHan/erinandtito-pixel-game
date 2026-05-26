import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [chapter, setChapter] = useState(1);

    return (
        <div className="game">
            {!gameStarted ? (
                <StartScreen onStart={() => setGameStarted(true)} />
            ) : chapter === 1 ? (
                <ChapterOne onChapterComplete={() => setChapter("transition")} />
            ) : chapter === "transition" ? (
                <TransitionScreen onComplete={() => setChapter(2)} />
            ) : (
                <ChapterTwo />
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

function ChapterOne({ onChapterComplete }) {
    const normalDialogues = [
        "Oh, here you are, hey Erin, finally you woke up :)",
        "Oh, I totally forgot to tell you who I am",
        "I would like to say I am Charlie and you are Emma, but I can't",
        "because I am brown, Mehmet :((",
        "Oh nooo!",
        "Tito is not at your apartment, where is he????",
        "We should find him",
        "Find the clue!"
    ];

    const clueDialogues = [
        "Wait...",
        "You found Tito's paw print!",
        "He must have walked this way...",
        "We should follow the clue."
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [foundClue, setFoundClue] = useState(false);

    const debugMode = true;
    const activeDialogues = foundClue ? clueDialogues : normalDialogues;

    useEffect(() => {
        const bgMusic = new Audio("/music/room-theme.mp3");
        bgMusic.volume = 0.25;
        bgMusic.loop = true;
        bgMusic.play().catch(() => {});

        return () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        let dotInterval;
        let typeInterval;
        let dotTimeout;
        const talkAudio = new Audio("/sounds/talk.wav");
        talkAudio.volume = 1;

        setDisplayText("");
        setIsTyping(true);
        setLoadingDots(".");

        dotInterval = setInterval(() => {
            setLoadingDots((prev) => prev === "..." ? "." : prev + ".");
        }, 250);

        dotTimeout = setTimeout(() => {
            clearInterval(dotInterval);
            setLoadingDots("");

            let charIndex = 0;
            const currentText = activeDialogues[dialogueIndex];

            typeInterval = setInterval(() => {
                setDisplayText(currentText.slice(0, charIndex + 1));

                talkAudio.currentTime = 0;
                talkAudio.play().catch(() => {});

                charIndex++;

                if (charIndex >= currentText.length) {
                    clearInterval(typeInterval);
                    talkAudio.pause();
                    setIsTyping(false);
                }
            }, 45);
        }, 700);

        return () => {
            clearInterval(dotInterval);
            clearInterval(typeInterval);
            clearTimeout(dotTimeout);
            talkAudio.pause();
        };
    }, [dialogueIndex, foundClue]);

    function nextDialogue() {
        if (isTyping && !debugMode) return;

        if (!foundClue && dialogueIndex === normalDialogues.length - 1) {
            return;
        }

        if (dialogueIndex < activeDialogues.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else if (foundClue) {
            onChapterComplete();
        }
    }

    function findClue() {
        setFoundClue(true);
        setDialogueIndex(0);
    }

    return (
        <div className="chapter-one">
            <img src="/room.png" className="room-bg" />

            <img src="/erin.png" className="erin-character" />

            {!foundClue && (
                <button className="paw-clue-button" onClick={findClue}>
                    <img src="/paw.png" className="clue1" />
                </button>
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
                        (!foundClue && dialogueIndex === normalDialogues.length - 1)
                    }
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

function TransitionScreen({ onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="transition-screen">
            <div className="transition-text">
                Erin follows Tito's paw print outside...
            </div>
        </div>
    );
}

function ChapterTwo({ onChapterComplete }) {
    const normalDialogues = [
        "Tito's paw prints end here...",
        "Hmm, do you have any idea where we are?",
        "Yep, that is correct, we are at the NJ Rock Climbing Gym",
        "This is the place we met each other first time",
        "But why was Tito here?",
        "I think we should find the next his paw."
    ];

    const clueDialogues = [
        "Wait...",
        "You found Tito's paw print again!",
        "Damn girl you are doing great!",
        "We should follow the next clue. Let's gooooo!"
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [foundClue, setFoundClue] = useState(false);

    const debugMode = true;
    const activeDialogues = foundClue ? clueDialogues : normalDialogues;

    useEffect(() => {
        const bgMusic = new Audio("/music/room-theme.mp3");
        bgMusic.volume = 0.25;
        bgMusic.loop = true;
        bgMusic.play().catch(() => {});

        return () => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        };
    }, []);

    useEffect(() => {
        let dotInterval;
        let typeInterval;
        let dotTimeout;
        const talkAudio = new Audio("/sounds/talk.wav");
        talkAudio.volume = 1;

        setDisplayText("");
        setIsTyping(true);
        setLoadingDots(".");

        dotInterval = setInterval(() => {
            setLoadingDots((prev) => prev === "..." ? "." : prev + ".");
        }, 250);

        dotTimeout = setTimeout(() => {
            clearInterval(dotInterval);
            setLoadingDots("");

            let charIndex = 0;
            const currentText = activeDialogues[dialogueIndex];

            typeInterval = setInterval(() => {
                setDisplayText(currentText.slice(0, charIndex + 1));

                talkAudio.currentTime = 0;
                talkAudio.play().catch(() => {});

                charIndex++;

                if (charIndex >= currentText.length) {
                    clearInterval(typeInterval);
                    talkAudio.pause();
                    setIsTyping(false);
                }
            }, 45);
        }, 700);

        return () => {
            clearInterval(dotInterval);
            clearInterval(typeInterval);
            clearTimeout(dotTimeout);
            talkAudio.pause();
        };
    }, [dialogueIndex, foundClue]);

    function nextDialogue() {
        if (isTyping && !debugMode) return;

        if (!foundClue && dialogueIndex === normalDialogues.length - 1) {
            return;
        }

        if (dialogueIndex < activeDialogues.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else if (foundClue) {
            onChapterComplete();
        }
    }

    function findClue() {
        setFoundClue(true);
        setDialogueIndex(0);
    }

    return (
        <div className="chapter-one">
            <img src="/climbing-gym.png" className="room-bg" />

            <img src="/erin-front.png" className="erin-character-chapter-two" />

            {!foundClue && (
                <button className="paw-clue-button" onClick={findClue}>
                    <img src="/paw.png" className="clue1-chapter-two" />
                </button>
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
                        (!foundClue && dialogueIndex === normalDialogues.length - 1)
                    }
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);