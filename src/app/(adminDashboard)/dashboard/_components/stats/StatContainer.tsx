"use client";
import { useGetDashboardStatQuery } from "@/redux/api/dashboardApi";
import { Skeleton } from "antd";
import { Users, Store, ListChecks } from "lucide-react";
import { FaUserGroup } from "react-icons/fa6";

interface MetricCard {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBgColor: string;
  loading?: boolean;
}

export default function MetricsDashboard({data, isLoading}: any) {


  const metrics: MetricCard[] = [
    {
      icon: <Users className="w-6 h-6" />,
      value: data?.totalEmployers,
      label: "Total Employers",
      iconBgColor: "bg-blue-100",
      loading: isLoading,
    },
    {
      icon: <FaUserGroup className="w-6 h-6" />,

      value: data?.totalWorkers,
      label: "Total Workers",
      iconBgColor: "bg-purple-100",
      loading: isLoading,
    },
    {
      icon: <ListChecks className="w-6 h-6" />,

      value: data?.totalJobs,
      label: "Total Jobs",
      iconBgColor: "bg-green-100",
      loading: isLoading,
    },
  ];

  const iconColors = ["text-blue-500", "text-purple-500", "text-green-500"];

  return (
    <div className="w-full bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-4 ">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Header with Icon and Percentage */}
            <div className="flex items-start justify-between mb-5">
              {/* Icon */}
              <div
                className={`${metric.iconBgColor} size-8 px-5 py-5 rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <div className={`${iconColors[index]} `}>{metric.icon}</div>
              </div>
            </div>

            {/* Value */}
            {metric?.loading ? (
              <Skeleton.Input active className="mb-2" />
            ) : (
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </div>
            )}

            {/* Label */}
            <div className="text-gray-500 text-base ">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
