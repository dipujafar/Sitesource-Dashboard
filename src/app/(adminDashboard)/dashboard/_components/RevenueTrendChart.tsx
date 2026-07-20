'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 32 },
  { month: 'Feb', revenue: 37 },
  { month: 'Mar', revenue: 40 },
  { month: 'Apr', revenue: 43 },
  { month: 'May', revenue: 45 },
  { month: 'Jun', revenue: 48 },
];

export function RevenueTrendChart() {
  return (
    <div className="w-full bg-white rounded-2xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Revenue Trend</h2>
        <p className="text-gray-500 text-sm">Introducer fees — last 6 months</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280" 
            style={{ fontSize: '14px' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            style={{ fontSize: '14px' }}
            axisLine={false}
            tickLine={false}
            label={{ value: '£', angle: -90, position: 'insideLeft', offset: 10, style: { fill: '#6b7280' } }}
            tickFormatter={(value) => `£${value}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            formatter={(value) => [`£${value}k`, 'Revenue']}
          />
          <Line
            type="natural"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 6 }}
            activeDot={{ r: 8 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
