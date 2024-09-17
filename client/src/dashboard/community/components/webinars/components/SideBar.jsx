import { Heart, Share2, Users, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Sidebar() {
  return (
    <div className="w-80 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Free</CardTitle>
          <div className="flex space-x-2">
            <Heart className="w-6 h-6" />
            <Share2 className="w-6 h-6" />
          </div>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Registration Closed
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 bg-gray-100 p-1.5 rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">Registered</p>
              <p className="font-semibold">4,84,306</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 bg-gray-100 p-1.5 rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">Team Size</p>
              <p className="font-semibold">1 - 3 Members</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Sparkles className="w-8 h-8 bg-gray-100 p-1.5 rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">Impressions</p>
              <p className="font-semibold">1,85,59,401</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 bg-gray-100 p-1.5 rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">Registration Deadline</p>
              <p className="font-semibold">10 Aug 24, 01:00 AM IST</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">Eligibility</h3>
          <p>Engineering Students • Undergraduate • Postgraduate</p>
          <h3 className="font-semibold text-lg">Countries</h3>
          <p>India</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">Refer & Win</h3>
          <p>MacBook, iPhone, Apple Watch, Cash and more!</p>
          <div className="flex space-x-2">
            <Button variant="outline">Refer Now</Button>
            <Button variant="outline">Know more</Button>
          </div>
          <Button className="w-full" variant="outline">
            Referral Leaderboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
