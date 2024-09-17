"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityReferrals({ loading }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>Community Powered Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <h3 className="font-semibold mb-2">Broad Network Access</h3>
              <p className="text-sm text-gray-500 mb-4">
                Access extensive 500+ mentor network across industries for
                unique job opportunities.
              </p>

              <h3 className="font-semibold mb-2">
                Collaborative Recommendations
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Receive collective mentor endorsements to boost your interview
                chances
              </p>

              <h3 className="font-semibold mb-2">Enhanced Credibility</h3>
              <p className="text-sm text-gray-500">
                Elevate your profile with referrals from respected community
                mentors
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
