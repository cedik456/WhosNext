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
    preferences: {
      workEnvironment: "Remote",
      workType: "Full-time",
    },
    bio: "A simple guy who loves learning new technologies.",
  },
  {
    id: 2,
    name: "Julia",
    avatar: avatar2,
    location: "Manila",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    preferences: {
      workEnvironment: "Hybrid",
      workType: "Part-time",
    },
    bio: "I want to work at a company that is top tier and learn at the same time.",
  },
  {
    id: 3,
    name: "Charles",
    avatar: avatar2,
    location: "Maroroy",
    skills: ["UI/UX", "Figma", "Adobe XD"],
  },
  {
    id: 4,
    name: "Lou",
    avatar: avatar2,
    location: "Tagas",
    skills: ["React", "NodeJs", "MongoDB"],
  },
];

const dummyJobs = [
  {
    id: 1,
    companyName: "Pixel Corp",
    hiringCriteria: {
      location: "Legazpi",
      skills: ["React", "JavaScript", "TypeScript", "ExpressJs", "Figma"],
    },
  },
  {
    id: 2,
    companyName: "Ownly",
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
