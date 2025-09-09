// contexts/NotifierContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";

const NotifierContext = createContext(null);

export function NotifierProvider({ children, socket, activeMatchId = null }) {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const anim = useRef(new Animated.Value(-100)).current;
  const hideTimerRef = useRef(null); // ✅ real timer ref

  const showNext = useCallback(() => {
    if (current || queue.length === 0) return;

    const next = queue[0];
    setCurrent(next);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const stayMs = next.duration ?? 3500;

      // ✅ clear + set
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        Animated.timing(anim, {
          toValue: -100,
          duration: 180,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }).start(() => {
          setCurrent(null);
          setQueue((q) => q.slice(1));
        });
      }, stayMs);
    });
  }, [anim, current, queue]);

  useEffect(() => {
    if (!current) showNext();
  }, [current, queue, showNext]);

  // ✅ cleanup on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const notify = useCallback((n) => {
    setQueue((q) => [...q, n]);
  }, []);

  // Optional sockets
  useEffect(() => {
    if (!socket) return;

    const onMatch = (payload) => {
      notify({
        title: "It’s a match!",
        body: `You and ${
          payload?.name ?? "a new match"
        } liked each other — say hi!`,
        avatar: payload?.avatar,
        variant: "match",
      });
    };

    // ✅ prevent duplicates before re-adding

    socket.off("matchFound", onMatch);

    socket.on("matchFound", onMatch);

    return () => {
      socket.off("matchFound", onMatch);
    };
  }, [socket, notify, activeMatchId]);

  // Optional: expose dismiss if you want manual close elsewhere
  const dismiss = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    Animated.timing(anim, {
      toValue: -100,
      duration: 160,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCurrent(null);
      setQueue((q) => q.slice(1));
    });
  }, [anim]);

  return (
    <NotifierContext.Provider value={{ notify, dismiss }}>
      <View style={{ flex: 1 }}>
        {children}

        <Animated.View
          pointerEvents={current ? "auto" : "none"}
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? 50 : 12,
            left: 12,
            right: 12,
            transform: [{ translateY: anim }],
            zIndex: 9999, // ✅ keep banner on top
            elevation: 10, // ✅ Android stacking
          }}
        >
          {current && (
            <Pressable
              onPress={dismiss}
              className="bg-black dark:bg-[#242526] rounded-2xl shadow-lg p-4 flex-row items-center"
              style={{ elevation: 4 }}
            >
              {current?.avatar ? (
                <Image
                  source={{ uri: current.avatar }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    marginRight: 10,
                  }}
                />
              ) : (
                <View className="w-8 h-8 mr-2 bg-gray-200 rounded-full dark:bg-gray-600" />
              )}
              <View className="flex-1">
                <Text
                  className="text-base font-semibold text-white"
                  numberOfLines={1}
                >
                  {current.title ?? "Notification"}
                </Text>
                <Text
                  className="text-sm text-gray-400 dark:text-gray-300 mt-0.5"
                  numberOfLines={2}
                >
                  {current.body ?? ""}
                </Text>
              </View>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </NotifierContext.Provider>
  );
}

export function useNotifier() {
  const ctx = useContext(NotifierContext);
  if (!ctx) throw new Error("useNotifier must be used within NotifierProvider");
  return ctx;
}
