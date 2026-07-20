import React from "react";
import StatsCards from "./_components/StatsCards";
import IntroducerFeeDashboard from "./_components/IntroducerFeeDashboard";
import RevenueTrendChart from "./_components/RevenueTrendChart";


export default function PayrollPartnerPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-text-color mb-1">
          Payroll Partner
        </h1>
        <p className="text-primary-gray text-base font-normal">
          Monitor integrations with the payroll provider
        </p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IntroducerFeeDashboard />
        <RevenueTrendChart />
      </div>
    </div>
  );
}
