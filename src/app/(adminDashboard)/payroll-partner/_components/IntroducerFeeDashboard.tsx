type TStat = {
  value: string;
  label: string;
};

const stats: TStat[] = [
  { value: "312", label: "Completed Placements" },
  { value: "1,847", label: "Completed Timesheets" },
  { value: "£48,200", label: "Monthly Introducer Fees" },
  { value: "£248,600", label: "YTD Revenue" },
];

const IntroducerFeeDashboard = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Introducer Fee Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, inx) => (
          <div key={inx} className="bg-gray-50 rounded-2xl p-5">
            <h3 className="text-2xl font-semibold text-gray-900">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroducerFeeDashboard;