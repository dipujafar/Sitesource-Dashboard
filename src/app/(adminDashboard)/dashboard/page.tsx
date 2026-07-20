import StatContainer from "./_components/stats/StatContainer";
import { UserGrowthChart } from "./_components/UserGrowthChart";
import { ActiveTradesChart } from "./_components/ActiveTradesChart";
import { DailyEngagementsChart } from "./_components/DailyEngagementsChart";
import { RevenueTrendChart } from "./_components/RevenueTrendChart";
import { RecentActivity } from "./_components/RecentActivity";

const DashboardPage = () => {
  return (
    <div className="lg:space-y-7 space-y-5 ">
      <StatContainer></StatContainer>

      {/* <UserOverViewChart></UserOverViewChart>

      <RecentAccountList></RecentAccountList> */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <UserGrowthChart />
        </div>
        <div>
          <ActiveTradesChart />
        </div>
      </div>
      <div className="grid xl:grid-cols-3 gap-3">
        <DailyEngagementsChart />
        <RevenueTrendChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
