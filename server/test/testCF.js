// Testing

const mongoose = require("mongoose");
const { cosineSimilarity } = require("../utils/similarity");
const {
  findSimilarUsers,
  aggregateCFRecommendations,
} = require("../utils/swipeUtils");

// swipe vectors

// (async () => {
//   const vec = await buildSwipeVector("68adb9a4ee72dbc5fa7578b6");
//   console.log("Swipe vector for lawrence", vec);
// })();

// cosine similarity

// const A = { R1: 1, R3: 1 }; // Alice
// const B = { R1: 1, R2: 1 }; // Bob
// const C = { R3: 1, R4: 1, R5: 1 }; // Charlie

// console.log("Alice vs Bob:", cosineSimilarity(A, B)); // expect 0.5
// console.log("Alice vs Charlie:", cosineSimilarity(A, C)); // expect ~0.41
// console.log("Bob vs Charlie:", cosineSimilarity(B, C));

// find similar users

// async function runTest() {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://07211816:NrusLM09xWo8OjzT@cluster0.hxwl8hn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//     );

//     const userId = "68adb9a4ee72dbc5fa7578b6"; // Lawrence?
//     const role = "jobSeeker";

//     const result = await findSimilarUsers(userId, role);

//     console.log("Similar Users:", result);

//     await mongoose.disconnect;
//   } catch (error) {
//     console.error("Error testing CF:", error);
//   }
// }

// runTest();

(async () => {
  await mongoose.connect(
    "mongodb+srv://07211816:NrusLM09xWo8OjzT@cluster0.hxwl8hn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  const neighbors = await findSimilarUsers(
    "68adb9a4ee72dbc5fa7578b6",
    "jobSeeker"
  );
  const alreadySwiped = ["R1", "R3"];

  const recs = await aggregateCFRecommendations(neighbors, alreadySwiped);

  console.log("CF Recommendations", recs);
})();
