'use client';

import { Skeleton } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function JobsByStatusChart({ data, isLoading }: any) {
  const chartData = Array.isArray(data)
    ? data.map((item, index) => ({
        name: item?.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase() : 'Unknown',
        value: Number(item?.count || 0),
        percentage: Number(item?.percentage || 0),
        color: colors[index % colors.length],
      }))
    : [];

  if (isLoading) {
    return (
      <div className="w-full bg-white p-6 rounded-2xl">
        <Skeleton.Input active size="small" style={{ width: 180, marginBottom: 18 }} />
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 min-h-[320px] flex items-center justify-center">
        <p className="text-gray-500 text-sm">No job status data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Jobs by Status</h2>
        <p className="text-gray-500 mt-1">Current job distribution</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
              label={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, _name, entry) => [`${value} jobs`, entry?.payload?.name || 'Status']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full grid grid-cols-2 gap-3">
          {chartData.map((entry, index) => (
            <div key={`${entry.name}-${index}`} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">{entry.name}</span>
              </div>
              <span className="text-gray-900 font-medium">{entry.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
