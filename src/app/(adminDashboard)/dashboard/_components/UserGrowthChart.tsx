'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', Workers: 2000, Contractors: 2100 },
  { month: 'Feb', Workers: 2150, Contractors: 2220 },
  { month: 'Mar', Workers: 2250, Contractors: 2350 },
  { month: 'Apr', Workers: 2400, Contractors: 2500 },
  { month: 'May', Workers: 2650, Contractors: 2750 },
  { month: 'Jun', Workers: 2850, Contractors: 2900 },
];

export function UserGrowthChart() {
  return (
    <div className="w-full bg-white p-6 rounded-lg ">
      {/* Header with title and date range */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">User Growth</h2>
          <p className="text-gray-500 text-sm mt-1">
            Workers & Contractors — last 6 months
          </p>
        </div>
        <span className="text-gray-500 text-sm">Jan - Jun 2024</span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorContractors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '14px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '14px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ paddingTop: '24px' }}
          />
          <Area
            type="natural"
            dataKey="Workers"
            stroke="#ef4444"
            fill="none"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
          <Area
            type="natural"
            dataKey="Contractors"
            stroke="#3b82f6"
            fill="url(#colorContractors)"
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
