"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import JourneyProgress from "./JourneyProgress";
import MentorRequests from "./MentorRequests";
import StatisticsCard from "./StatisticsCard";
import ReferralsGiven from "./ReferralsGiven";
import CommunityReferrals from "./CommunityReferrals";

export default function MyReferrals() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  setTimeout(() => setLoading(false), 2000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-4">My Referrals</h1>
      <p className="text-gray-600 mb-8">
        Here you can see all the referral requests of preplaced mentees and also
        you can manage you own LTM mentees for their referral requests
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <JourneyProgress loading={loading} />
          <MentorRequests loading={loading} />
        </div>
        <div className="space-y-8">
          <StatisticsCard loading={loading} />
          <ReferralsGiven loading={loading} />
          <CommunityReferrals loading={loading} />
        </div>
      </div>
    </motion.div>
  );
}
