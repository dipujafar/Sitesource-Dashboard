'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function ActiveTradesChart() {
  const data = [
    { name: 'Electrician', value: 28 },
    { name: 'Plumbing', value: 22 },
    { name: 'Carpentry', value: 18 },
    { name: 'Bricklaying', value: 15 },
    { name: 'Groundworks', value: 10 },
    { name: 'Other', value: 7 },
  ];

  const colors = ['#ff5722', '#2196F3', '#1abc9c', '#ffa500', '#8e44ad', '#95a5a6'];


  return (
    <div className="w-full bg-white rounded-2xl   p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Active Trades</h2>
        <p className="text-gray-500 mt-1">Distribution by category</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="w-full grid grid-cols-2 gap-3">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-gray-600">{entry.name}</span>
              </div>
              <span className="text-gray-900 font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
