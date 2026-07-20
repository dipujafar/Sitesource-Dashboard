"use client";

import { UserPlus, Briefcase, CheckCircle, Clock, Star } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  icon: "user" | "briefcase" | "check" | "clock" | "star";
}

const activities: Activity[] = [
  {
    id: "1",
    title: "New worker registered",
    description: "James Mitchell — Electrician, London",
    timeAgo: "2 min ago",
    icon: "user",
  },
  {
    id: "2",
    title: "Engagement started",
    description: "ENG-2024-089 — Harrington Build × Sarah M",
    timeAgo: "14 min ago",
    icon: "briefcase",
  },
  {
    id: "3",
    title: "Verification completed",
    description: "Apex Civil Works — Companies House confirmed",
    timeAgo: "31 min ago",
    icon: "check",
  },
  {
    id: "4",
    title: "Timesheet approved",
    description: "Raj Patel — w/e 22 Jun 2024, 48 hrs",
    timeAgo: "1 hr ago",
    icon: "clock",
  },
  {
    id: "5",
    title: "Review submitted",
    description: "Harrington Build rated James Mitchell 5★",
    timeAgo: "2 hr ago",
    icon: "star",
  },
];

const iconMap = {
  user: <UserPlus className="w-6 h-6 text-blue-500" />,
  briefcase: <Briefcase className="w-6 h-6 text-teal-500" />,
  check: <CheckCircle className="w-6 h-6 text-teal-500" />,
  clock: <Clock className="w-6 h-6 text-orange-500" />,
  star: <Star className="w-6 h-6 text-yellow-500" />,
};

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg  p-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-gray-400 mt-1">Live platform events</p>
        </div>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1 p-2 bg-gray-100 rounded-lg">
              {iconMap[activity.icon]}
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="text-gray-900 font-semibold leading-tight">
                {activity.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 truncate">
                {activity.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-gray-400 text-sm whitespace-nowrap ml-4">
              {activity.timeAgo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
