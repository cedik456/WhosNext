import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Modal } from "react-native";

const SwipeDeck = () => {
  const [role, setRole] = useState(null);
  const [cards, setCards] = useState([]);

  const [matchModalVisible, setMatchModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  const router = useRouter();
  const { shouldRefetch, setShouldRefetch } = useRefetch();

  const [loading, setLoading] = useState(true);

  const [seeMoreVisible, setSeeMoreVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [isProcessingMatch, setIsProcessingMatch] = useState(false);

  const bgColors = [
    "#fefce8",
    "#f0f9ff",
    "#fef2f2",
    "#f8fafc",
    "#f1f5f9",
    "#fff7ed",
  ];

  const swiperRef = useRef(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const role = await getUserRole();
      setRole(role);

      const token = await getToken();
      if (!token) return;

      const response = await api.get("/card/recommendations/v4", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, data } = response.data;

      if (success) {
        // const shuffledCards = shuffleArray(data);
        setCards(data);
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

  const handleSwipe = async (targetId, action, cardIndex) => {
    if (isProcessingMatch) return;

    try {
      setIsProcessingMatch(true);

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
        // 🔎 find the card data
        const matchedCard = cards.find(
          (c) => c.userId === targetId || c._id === targetId
        );

        const newMatch = {
          name:
            matchedCard?.userId?.name ||
            matchedCard?.companyName ||
            "Matched User",
          avatar:
            matchedCard?.userId?.avatar ||
            matchedCard?.avatar ||
            matchedCard?.companyPicture,
          matchId: response.data.match,
        };

        setMatchedUser(newMatch);
        setMatchModalVisible(true);
      } else {
        setIsProcessingMatch(false);
      }
    } catch (error) {
      console.error("Swipe:", error);
      setIsProcessingMatch(false);
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
        ref={swiperRef}
        key={`deck-${role}-${cards.length}`}
        cards={cards}
        renderCard={(card, index) => {
          if (card.companyName) {
            return (
              <JobCard
                data={card}
                onSeeMore={() => {
                  setSelectedJob(card);
                  setSeeMoreVisible(true);
                }}
              />
            );
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
          handleSwipe(
            cards[cardIndex]?.userId || cards[cardIndex]?._id,
            "like",
            cardIndex
          )
        }
        onSwipedLeft={(cardIndex) =>
          handleSwipe(
            cards[cardIndex]?.userId || cards[cardIndex]?._id,
            "nope",
            cardIndex
          )
        }
        disableLeftSwipe={
          seeMoreVisible || matchModalVisible || isProcessingMatch
        }
        disableRightSwipe={
          seeMoreVisible || matchModalVisible || isProcessingMatch
        }
        disableTopSwipe
        disableBottomSwipe
        animateOverlayLabelsOpacity
        animateOverlayLabelsScale
        overlayOpacityHorizontalThreshold={10}
        overlayLabels={{
          left: {
            element: (
              <View
                className="px-4 py-2 rounded-lg"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              >
                <Text className="text-3xl text-white font-poppins-700">
                  NEXT
                </Text>
              </View>
            ),
            style: {
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            element: (
              <View
                className="px-6 py-2 rounded-lg"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              >
                <Text className="text-3xl text-white font-poppins-700">
                  LIKE
                </Text>
              </View>
            ),
            style: {
              label: {
                backgroundColor: "green",
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                padding: 10,
                borderRadius: 6,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: 20,
              },
            },
          },
        }}
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
                    setIsProcessingMatch(false);
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
                    setIsProcessingMatch(false);
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

      <Modal
        visible={seeMoreVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSeeMoreVisible(false)}
      >
        <View className="justify-end flex-1 bg-black/50">
          <View className="bg-white dark:bg-[#242526] rounded-t-2xl p-6 max-h-[80%]">
            <Text className="mb-4 text-xl font-poppins-600 dark:text-white">
              Job Description
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-base leading-6 text-gray-600 dark:text-gray-300 font-poppins">
                {selectedJob?.jobDescription || "No description available"}
              </Text>
            </ScrollView>

            <TouchableOpacity
              onPress={() => setSeeMoreVisible(false)}
              className="items-center py-3 mt-6 bg-blue-600 rounded-xl"
            >
              <Text className="text-base text-white font-poppins-600">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SwipeDeck;
