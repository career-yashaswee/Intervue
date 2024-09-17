export const fetchChats = async () => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      id: 1,
      name: "Stellar Six",
      lastMessage: "ntervue promotes envi...",
      time: "2023-06-15T12:22:00",
      avatar: "/placeholder.svg?height=48&width=48",
      unreadCount: 0,
    },
    {
      id: 2,
      name: "केशरवानी परिवार",
      lastMessage: "हैप्पी बर्थडे से श्रेया बेटा",
      time: "2023-06-14T15:30:00",
      unreadCount: 1,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 3,
      name: "+91 98610 33670",
      lastMessage: "https://dl.acm.org/doi/pdf/10.1145/35...",
      time: "2023-06-14T10:45:00",
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ];
};
