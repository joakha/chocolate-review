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

const flavors = [
    "Dark Chocolate",
    "Milk Chocolate",
    "Hazelnut",
    "Caramel",
    "Sea Salt",
    "Mint",
    "Orange",
    "Coffee",
    "Raspberry",
    "Chili",
    "Toffee",
    "Almond",
    "White Chocolate",
    "Coconut",
    "Cinnamon",
    "Lavender",
    "Matcha",
    "Cherry",
    "Rum",
    "Cookie"
];

const ratingFilterOptions = ["5", "4", "3", "2", "1"];

const priceFilterOptions = [5, 4, 3];

export {
    BACKEND_URL,
    scoreStrings,
    flavors,
    ratingFilterOptions,
    priceFilterOptions
}