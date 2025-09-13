// testJaccard.js
const { jaccardSimilarity } = require("../server/utils/similarity");

const setA = new Set(["React", "Node", "MongoDB"]);
const setB = new Set(["React", "Node", "Express"]);

const score = jaccardSimilarity(setA, setB);
console.log("Jaccard Score:", score);
