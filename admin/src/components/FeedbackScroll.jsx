import { useState } from "react";
import logown from "../assets/logown.png";

const feedbacks = [
  {
    id: 1,
    photo: logown,
    name: "Ana",
    title: "Login Issue",
    description:
      'I cannot log into my account using my usual credentials. The system shows an "Invalid username or password" message even after resetting my password.',
  },
  {
    id: 2,
    photo: logown,
    name: "Ben",
    title: "Payment Error",
    description:
      "I was charged twice when trying to top up my balance. The payment gateway confirmed the error but my funds have not been refunded.",
  },
  {
    id: 3,
    photo: logown,
    name: "Cara",
    title: "UI Glitch",
    description:
      "The navigation menu overlaps with text on smaller screens, making it difficult to read options. Additionally, some icons are misaligned causing confusion.",
  },
  {
    id: 4,
    photo: logown,
    name: "Dino",
    title: "Slow Performance",
    description:
      "The dashboard takes over 10 seconds to load every time I switch tabs. This delay is significantly affecting my productivity throughout the day.",
  },
  {
    id: 5,
    photo: logown,
    name: "Eva",
    title: "Login Issue",
    description:
      "Two-factor authentication code is not being sent to my registered email. Without this code I cannot complete the login process.",
  },
  {
    id: 6,
    photo: logown,
    name: "Finn",
    title: "Payment Error",
    description:
      "When I try to purchase credits, the transaction fails with an unknown error. My bank statement shows a pending charge that never resolves.",
  },
  {
    id: 7,
    photo: logown,
    name: "Gina",
    title: "UI Glitch",
    description:
      "The search bar disappears when I scroll down on the home page. I have to scroll back up every time to perform a new search.",
  },
  {
    id: 8,
    photo: logown,
    name: "Jollibee",
    title: "Slow Performance",
    description:
      "The application lags heavily when uploading multiple images at once. I often see spinning loaders that never finish.",
  },
];

const FeedbackScroll = () => {
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="h-screen px-2 py-6 overflow-auto ">
      <h2 className="mb-3 text-lg font-semibold">Feedbacks</h2>
      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          onClick={() => toggleExpand(fb.id)}
          className={`p-3 mb-3 transition bg-gray-100 rounded-lg shadow-xs cursor-pointer hover:bg-gray-200 ${
            expandedId === fb.id ? "" : "max-h-16 overflow-hidden"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={fb.photo}
                className="w-10 h-10 mr-3 bg-gray-300 rounded-full"
              />
              <div>
                <div className="text-base text-gray-800 ">{fb.name}</div>
                <div className="text-sm text-gray-600">{fb.title}</div>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transform text-xs transition-transform ${
                expandedId === fb.id ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          {/* description */}
          <div className="text-sm text-gray-700">
            {expandedId === fb.id
              ? fb.description
              : `${fb.description.slice(0, 80)}${
                  fb.description.length > 80 ? "..." : ""
                }`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackScroll;
