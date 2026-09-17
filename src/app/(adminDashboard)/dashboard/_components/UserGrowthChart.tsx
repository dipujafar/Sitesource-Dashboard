'use client';

import { Skeleton } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const formatMonthLabel = (month: string) => {
  if (!month) return '';
  return month.slice(0, 3).charAt(0).toUpperCase() + month.slice(1, 3).toLowerCase();
};

export function UserGrowthChart({ data, isLoading }: any) {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        month: formatMonthLabel(item?.month || ''),
        users: Number(item?.users || 0),
      }))
    : [];

  if (isLoading) {
    return (
      <div className="w-full bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-8">
          <Skeleton.Input active size="small" style={{ width: 160 }} />
          <Skeleton.Input active size="small" style={{ width: 120 }} />
        </div>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full bg-white p-6 rounded-lg flex items-center justify-center min-h-[420px]">
        <p className="text-gray-500 text-sm">No user growth data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg ">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">User Growth</h2>
          <p className="text-gray-500 text-sm mt-1">Total users — last 12 months</p>
        </div>
        <span className="text-gray-500 text-sm">
          {chartData[0]?.month} - {chartData[chartData.length - 1]?.month}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '14px' }} />
          <YAxis stroke="#6b7280" style={{ fontSize: '14px' }} />
          <Tooltip
            formatter={(value: number) => [`${value}`, 'Users']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            fill="url(#colorUsers)"
            strokeWidth={3}
            isAnimationActive={false}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
