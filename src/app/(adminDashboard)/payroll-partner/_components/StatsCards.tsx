import { cn } from "@/lib/utils";

type TStatCard = {
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  status: string;
  title: string;
  subtitle: string;
  description: string;
};

const cards: TStatCard[] = [
  {
    dotColor: "bg-green-500",
    badgeBg: "bg-green-50",
    badgeText: "text-green-600",
    status: "Active",
    title: "Contractor Umbrella Ltd",
    subtitle: "Active Payroll Partner",
    description: "Integration active",
  },
  {
    dotColor: "bg-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
    status: "Active",
    title: "589",
    subtitle: "Connected Contractors",
    description: "+12 this month",
  },
  {
    dotColor: "bg-purple-500",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-600",
    status: "Active",
    title: "2,634",
    subtitle: "Connected Workers",
    description: "+87 this month",
  },
  {
    dotColor: "bg-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-600",
    status: "Active",
    title: "24",
    subtitle: "Pending Onboarding",
    description: "Awaiting confirmation",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, inx) => (
        <div
          key={inx}
          className="bg-white border border-gray-100 rounded-2xl p-5"
        >
          <div
            className={cn(
              "inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-xl text-xs font-medium mb-4",
              card.badgeBg,
              card.badgeText
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-xl", card.dotColor)} />
            {card.status}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {card.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2">{card.subtitle}</p>
          <p className="text-sm text-gray-400">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;