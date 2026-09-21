'use client';

import { Skeleton } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatMonthLabel = (month: string) => {
  if (!month) return '';
  return month.slice(0, 3).charAt(0).toUpperCase() + month.slice(1, 3).toLowerCase();
};

export function MonthlyJobsChart({ data, isLoading }: any) {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        month: formatMonthLabel(item?.month || ''),
        jobs: Number(item?.jobs || 0),
      }))
    : [];

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-2xl p-6">
        <Skeleton.Input active size="small" style={{ width: 170, marginBottom: 18 }} />
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 min-h-[250px] flex items-center justify-center">
        <p className="text-gray-500 text-sm">No monthly jobs data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Monthly Jobs</h2>
        <p className="text-gray-500 text-sm">Jobs posted — last 12 months</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
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
            width={42}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            formatter={(value) => [`${value}`, 'Jobs']}
          />
          <Line
            type="natural"
            dataKey="jobs"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
            activeDot={{ r: 7 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
