import { View, Text, Modal, Image, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { getUserRole } from "../utils/secureUser";
import JobCard from "./JobCard";
import ProfileCard from "./ProfileCard";
import FallBackCard from "./FallBackCard";
import Swiper from "react-native-deck-swiper";
import { getToken } from "../utils/storage";
import api from "../utils/axiosInstance";
import Button from "../components/Button";
import { useFocusEffect, useRouter } from "expo-router";
import { useRefetch } from "../contexts/RefetchContext";
import { ActivityIndicator } from "react-native-paper";

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

  const [matchModalVisible, setMatchModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  const router = useRouter();
  const { shouldRefetch, setShouldRefetch } = useRefetch();

  const [loading, setLoading] = useState(true);

  const bgColors = [
    "#fefce8",
    "#f0f9ff",
    "#fef2f2",
    "#f8fafc",
    "#f1f5f9",
    "#fff7ed",
  ];

  const fetchCards = async () => {
    try {
      setLoading(true);
      const role = await getUserRole();
      setRole(role);

      const token = await getToken();
      if (!token) return;

      const response = await api.get("/card/recommendations/v2", {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(); // only once when component first mounts
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      fetchCards();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  const handleSwipe = async (targetId, action) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await api.post(
        "/swipe",
        { targetId, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.match) {
        console.log("🎯 MATCH DETECTED:", response.data.match);
        const matchedCard = cards.find(
          (c) => c.userId === targetId || c._id === targetId
        );

        console.log("Matched Card:", matchedCard);

        setMatchedUser({
          name:
            matchedCard?.userId?.name ||
            matchedCard?.companyName ||
            "Matched User",
          avatar:
            matchedCard?.userId?.avatar ||
            matchedCard?.avatar ||
            matchedCard?.companyPicture,
          matchId: response.data.match,
        });

        setMatchModalVisible(true);
      }
    } catch (error) {
      console.error("Swipe:", error);
      Alert.alert("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#9ca3af" />
        <Text className="mt-4 text-gray-500 font-poppins-500">
          Finding the best matches for you...
        </Text>
      </View>
    );
  }

  if (!cards.length) {
    return <FallBackCard />;
  }

  return (
    <View className="flex-1 ">
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
        onSwipedRight={(cardIndex) =>
          handleSwipe(cards[cardIndex]?.userId || cards[cardIndex]?._id, "like")
        }
        onSwipedLeft={(cardIndex) =>
          handleSwipe(cards[cardIndex]?.userId || cards[cardIndex]?._id, "nope")
        }
        disableTopSwipe
        disableBottomSwipe
      />

      {matchedUser && (
        <Modal
          visible={matchModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMatchModalVisible(false)}
        >
          <View className="items-center justify-center flex-1 bg-white">
            <View className="items-center w-11/12 p-6 bg-white rounded-xl">
              {/* <View className="flex-row items-center justify-center mb-6">
            
            </View> */}
              <Text className="gap-6 mb-2 text-3xl text-center font-poppins-700">
                It's a match!
              </Text>

              <Text className="mb-2 text-lg text-center font-poppins-500">
                You and {matchedUser.name} liked each other!
              </Text>

              <View className="w-full gap-3">
                <Button
                  title="Start Chat"
                  className="w-full rounded-full"
                  textClassName="text-center"
                  onPress={() => {
                    setMatchModalVisible(false);
                    router.push({
                      pathname: "/chat",
                      params: {
                        matchId: matchedUser.matchId,
                        name: matchedUser.name,
                        avatar: matchedUser.avatar,
                      },
                    });
                  }}
                />
                <Button
                  title="Skip for now"
                  onPress={() => {
                    setMatchModalVisible(false);
                  }}
                  className="w-full bg-gray-300 rounded-full"
                  textClassName="text-center"
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default SwipeDeck;
