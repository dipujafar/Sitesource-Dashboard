"use client";
import StatContainer from "./_components/stats/StatContainer";
import { UserGrowthChart } from "./_components/UserGrowthChart";
import { JobsByStatusChart } from "./_components/ActiveTradesChart";
import { MonthlyJobsChart } from "./_components/RevenueTrendChart";
import { useGetDashboardStatQuery } from "@/redux/api/dashboardApi";

const DashboardPage = () => {
  const { data, isLoading } = useGetDashboardStatQuery(undefined);

  return (
    <div className="lg:space-y-7 space-y-5 ">
      <StatContainer data={data?.data} isLoading={isLoading} />

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2">
          <UserGrowthChart
            data={data?.data?.userGrowth}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full">
          <JobsByStatusChart
            data={data?.data?.jobsByStatus}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="">
        <MonthlyJobsChart
          data={data?.data?.monthlyJobs}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
