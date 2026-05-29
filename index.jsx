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
                <ChapterOne onChapterComplete={() => setChapter("transition1")} />
            ) : chapter === "transition1" ? (
                <TransitionScreen
                    text="CHAPTER 2 - Erin followed the paw print..."
                    onComplete={() => setChapter(2)}
                />
            ) : chapter === 2 ? (
                <ChapterTwo onChapterComplete={() => setChapter("transition2")} />
            ) : chapter === "transition2" ? (
                <TransitionScreen
                    text="CHAPTER 3 - Erin is getting closer to Tito..."
                    onComplete={() => setChapter(3)}
                />
            ) : chapter === 3 ? (
                <ChapterThree onChapterComplete={() => setChapter("transition3")} />
            ) : chapter === "transition3" ? (
                <TransitionScreen
                    text="CHAPTER 4 - The trail led Erin through the city..."
                    onComplete={() => setChapter(4)}
                />
            ) : chapter === 4 ? (
                <ChapterFour onChapterComplete={() => setChapter("transition4")} />
            ) : chapter === "transition4" ? (
                <TransitionScreen
                    text="CHAPTER 5 - The receipt mentioned something about stars..."
                    onComplete={() => setChapter(5)}
                />
            ) : chapter === 5 ? (
                <ChapterFive onChapterComplete={() => setChapter("final")} />
            ) : chapter === "final" ? (
                <FinalChapter />
            ) : (
                <Ending />
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

    const debugMode = false;
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

function TransitionScreen({ text, onComplete }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="transition-screen">
            <div className="transition-text">
                {text}
            </div>
        </div>
    );
}

function ChapterTwo({ onChapterComplete }) {
    const normalDialogues = [
        "Tito's paw prints end here...",
        "Hmm, do you have any idea where we are?",
        "Yep, that is correct, we are at the NJ Rock Climbing Gym",
        "This is the place we met each other first time ❤️",
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

    const debugMode = false;
    const activeDialogues = foundClue ? clueDialogues : normalDialogues;

    useEffect(() => {
        const bgMusic = new Audio("/music/chapter2.mp3");
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

function ChapterThree({ onChapterComplete }) {
    const normalDialogues = [
        "We are at the theater ?!",
        "But still I don't see Tito",
        "Why was he here?",
        "HAHAHA Erin, look at the posters!",
        "But why was Tito here?",
        "I think we should find the next his paw."
    ];

    const clueDialogues = [
        "Wait...",
        "You found Tito's paw print again!",
        "I feel we are so close to find him.",
        "Let's gooooo!"
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [foundClue, setFoundClue] = useState(false);

    const debugMode = false;
    const activeDialogues = foundClue ? clueDialogues : normalDialogues;

    useEffect(() => {
        const bgMusic = new Audio("/music/chapter3.mp3");
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
            <img src="/movie_theater.png" className="room-bg" />

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

function ChapterFour({ onChapterComplete }) {
    const normalDialogues = [
        "Wait...",
        "This is Sultan Bakery!",
        "The greatest bakery in New Jersey.",
        "At least according to Mehmet. lol",
        "Look all these baklava and turkish delight (lokum<3)",
        "Tito always gets excited when we come here.",
        "Maybe somebody saw him.",
        "Let's look around."
    ];

    const clueDialogues = [
        "Another paw print!",
        "Wait a second...",
        "There is a receipt next to it.",
        "It says: '1 Simit, 1 Acma, 1 Mystery Item'.",
        "Tito definitely left this on purpose.",
        "Let's follow the trail.",
        "Let's go downstairs!"
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");
    const [foundClue, setFoundClue] = useState(false);

    const debugMode = false;
    const activeDialogues = foundClue ? clueDialogues : normalDialogues;

    useEffect(() => {
        const bgMusic = new Audio("/music/chapter4.mp3");
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
            <img src="/sultan_bakery.png" className="room-bg" />

            <img src="/erin-front.png" className="erin-character-chapter-four" />

            {!foundClue && (
                <button className="paw-clue-button" onClick={findClue}>
                    <img src="/paw.png" className="clue1-chapter-four" />
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

function ChapterFive({ onChapterComplete }) {
    const normalDialogues = [
        "Wait...",
        "Hahahaha, we found him ❤️❤️❤️❤️",
        "He is hungry as always lol ❤️",
        "Oh no, he is running upstairs!",
        "Hurry up, we should catch him."
    ];

    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");

    const debugMode = false;

    useEffect(() => {
        const bgMusic = new Audio("/music/chapter5.mp3");
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
            const currentText = normalDialogues[dialogueIndex];

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
    }, [dialogueIndex]);

    function nextDialogue() {
        if (isTyping && !debugMode) return;

        if (dialogueIndex < normalDialogues.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else {
            onChapterComplete();
        }
    }

    return (
        <div className="chapter-one">
            <img src="/titos_feeder.png" className="room-bg" />

            <div className="dialogue-container">
                <img src="/dialogue.png" className="dialogue-image" />

                <div className="dialogue-text">
                    {loadingDots || displayText}
                </div>

                <button
                    className="next-button"
                    onClick={nextDialogue}
                    disabled={isTyping && !debugMode}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

function FinalChapter({ onChapterComplete }) {
    const normalDialogues = [
        "Wow, look at this view.",
        "I knew it, he brought us on purpose",
        "Such a nice view huh.",
        "You know what Erin ",
        "Tito and I planned everything :) ❤️",
        "I hope you like this mini game that I made only for you and Tito <3",
        "I told you I am a .... wait what is this.",
        "Looks like Tito has something to give you",
        "It is a letter..."
    ];

    const [showLetter, setShowLetter] = useState(false);
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [loadingDots, setLoadingDots] = useState("");

    const debugMode = false;

    useEffect(() => {
        const bgMusic = new Audio("/music/chapter-final.mp3");
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
            const currentText = normalDialogues[dialogueIndex];

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
    }, [dialogueIndex]);

    function nextDialogue() {
        if (isTyping && !debugMode) return;

        if (dialogueIndex < normalDialogues.length - 1) {
            setDialogueIndex(dialogueIndex + 1);
        } else {
            setShowLetter(true);
        }
    }

    if (showLetter) {
        return (
            <div className="letter-fullscreen">
                <img
                    src="/letter.png"
                    className="letter-image"
                />
            </div>
        );
    }

    return (
        <div className="chapter-one">
            <img src="/last_view.png" className="room-bg" />

            <div className="dialogue-container">


                <div className="dialogue-text">
                    {loadingDots || displayText}
                </div>

                <button
                    className="next-button"
                    onClick={nextDialogue}
                    disabled={isTyping && !debugMode}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

createRoot(document.getElementById("root")).render(<App />);