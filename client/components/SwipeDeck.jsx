import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserRole } from "../utils/secureUser";
import JobCard from "./JobCard";
import ProfileCard from "./ProfileCard";
import Swiper from "react-native-deck-swiper";
import avatar5 from "../assets/Avatar5.png";
import avatar2 from "../assets/Avatar2.png";

// Dummy data for demo
const dummyProfiles = [
  {
    id: 1,
    name: "Cedric",
    avatar: avatar5,
    location: "Legazpi",
    skills: ["React", "Figma", "Tailwind", "Express", "MongoDB", "Git"],
  },
  {
    id: 2,
    name: "Julia",
    avatar: avatar2,
    location: "Manila",
    skills: ["UI/UX", "Figma", "Adobe XD"],
  },
];

const dummyJobs = [
  {
    id: 1,
    companyName: "Pixel Corp",
    hiringCriteria: {
      location: "Remote",
      skills: ["React", "JavaScript", "TypeScript"],
    },
  },
  {
    id: 2,
    companyName: "Designly",
    hiringCriteria: {
      location: "Cebu",
      skills: ["Figma", "UX Research", "Wireframing"],
    },
  },
];

const SwipeDeck = () => {
  const [role, setRole] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const load = async () => {
      const role = await getUserRole();
      setRole(role);

      if (role === "jobSeeker") {
        setCards(dummyJobs);
      } else {
        setCards(dummyProfiles);
      }
    };

    load();
  }, []);

  return (
    <View className="justify-center flex-1">
      <Swiper
        cards={cards}
        renderCard={(card) =>
          role === "jobSeeker" ? (
            <JobCard data={card} />
          ) : (
            <ProfileCard card={card} />
          )
        }
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
