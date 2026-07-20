"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 31000 },
  { month: "Feb", revenue: 35000 },
  { month: "Mar", revenue: 37000 },
  { month: "Apr", revenue: 42000 },
  { month: "May", revenue: 44000 },
  { month: "Jun", revenue: 49000 },
];

const formatYAxis = (value: number) => `£${value / 1000}k`;

const RevenueTrendChart = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Revenue Trend
      </h2>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="#F1F1F1"
            />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#F1F1F1" }}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              dy={10}
            />
            <YAxis
              domain={[0, 60000]}
              ticks={[0, 15000, 30000, 45000, 60000]}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FF5C00"
              strokeWidth={3}
              dot={{ fill: "#FF5C00", r: 6, strokeWidth: 0 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueTrendChart;