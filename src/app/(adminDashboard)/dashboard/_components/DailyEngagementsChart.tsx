'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 58 },
  { day: 'Wed', value: 52 },
  { day: 'Thu', value: 70 },
  { day: 'Fri', value: 78 },
  { day: 'Sat', value: 30 },
  { day: 'Sun', value: 18 },
];

export function DailyEngagementsChart() {
  return (
    <div className="w-full bg-white rounded-lg  p-6">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">Daily Engagements</h2>
        <p className="text-sm text-gray-500 mt-1">This week</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <style>{`
              .custom-bar { border-radius: 4px 4px 0 0; }
            `}</style>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="#9ca3af"
            style={{ fontSize: '14px' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '14px' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar
            dataKey="value"
            fill="#ff5722"
            radius={[8, 8, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
