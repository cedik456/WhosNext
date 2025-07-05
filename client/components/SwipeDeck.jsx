import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserRole } from "../utils/secureUser";
import JobCard from "./JobCard";
import ProfileCard from "./ProfileCard";
import Swiper from "react-native-deck-swiper";
import { getToken } from "../utils/storage";
import api from "../utils/axiosInstance";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SwipeDeck = () => {
  const [role, setRole] = useState(null);
  const [cards, setCards] = useState([]);

  const bgColors = [
    "#fefce8",
    "#f0f9ff",
    "#fef2f2",
    "#f8fafc",
    "#f1f5f9",
    "#fff7ed",
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const role = await getUserRole();
        setRole(role);

        const token = await getToken();
        if (!token) return;

        const response = await api.get("/card/recommendations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { success, data } = response.data;

        if (success) {
          const shuffledCards = shuffleArray(data);
          setCards(shuffledCards);
        }
      } catch (error) {
        console.error("Failed to fetch cards:", error.message);
      }
    };

    fetchCards();
  }, []);

  if (!cards.length) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg text-gray-500 font-poppins-500">
          No available profiles yet.
        </Text>
      </View>
    );
  }

  return (
    <View className="justify-center flex-1">
      <Swiper
        key={`deck-${role}-${cards.length}`}
        cards={cards}
        renderCard={(card, index) => {
          if (card.companyName) {
            return <JobCard data={card} />;
          } else if (card.userId) {
            return (
              <ProfileCard
                card={card}
                color={bgColors[index % bgColors.length]}
              />
            );
          } else {
            return (
              <View className="items-center justify-center flex-1">
                <Text className="text-lg text-gray-500 font-poppins-500">
                  Invalid card data
                </Text>
              </View>
            );
          }
        }}
        stackSize={3}
        cardIndex={0}
        backgroundColor="transparent"
        verticalSwipe={false}
        disableTopSwipe
        disableBottomSwipe
      />
    </View>
  );
};

export default SwipeDeck;
