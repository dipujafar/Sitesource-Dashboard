import { Users, Building2, Store, TrendingUp } from 'lucide-react'

interface MetricCard {
  icon: React.ReactNode
  percentage: string
  value: string
  label: string
  iconBgColor: string
}

export default function MetricsDashboard() {
  const metrics: MetricCard[] = [
    {
      icon: <Users className="w-6 h-6" />,
      percentage: '+12.4%',
      value: '2,847',
      label: 'Total Workers',
      iconBgColor: 'bg-blue-100',
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      percentage: '+8.2%',
      value: '634',
      label: 'Total Contractors',
      iconBgColor: 'bg-purple-100',
    },
    {
      icon: <Store className="w-6 h-6" />,
      percentage: '+5.1%',
      value: '312',
      label: 'Active Engagements',
      iconBgColor: 'bg-green-100',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      percentage: '+5.7%',
      value: '£48,200',
      label: 'Monthly Revenue',
      iconBgColor: 'bg-orange-100',
    },
  ]

  const iconColors = [
    'text-blue-500',
    'text-purple-500',
    'text-green-500',
    'text-orange-500',
  ]

  return (
    <div className="w-full bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Header with Icon and Percentage */}
            <div className="flex items-start justify-between mb-5">
              {/* Icon */}
              <div className={`${metric.iconBgColor} size-8 px-5 py-5 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <div className={`${iconColors[index]} `}>
                  {metric.icon}
                </div>
              </div>

              {/* Percentage */}
              <div className="text-teal-500 text-base font-semibold flex items-center gap-1">
                <span className="text-lg">↗</span>
                {metric.percentage}
              </div>
            </div>

            {/* Value */}
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {metric.value}
            </div>

            {/* Label */}
            <div className="text-gray-500 text-base ">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
