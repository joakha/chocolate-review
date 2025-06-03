//constant values used by application

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const scoreStrings = {
        0: "Unbearable",
        1: "Poor",
        2: "Lacking",
        3: "Decent",
        4: "Good",
        5: "Great"
    };

export {
    BACKEND_URL,
    scoreStrings
}