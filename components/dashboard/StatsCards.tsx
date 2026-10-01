interface StatsCardsProps {
  total: number;
  running: number;
  completed: number;
  failed: number;
}

export default function StatsCards({
  total,
  running,
  completed,
  failed,
}: StatsCardsProps) {
  const cards = [
    {
      label: "Total Tests",
      value: total,
    },
    {
      label: "Running",
      value: running,
    },
    {
      label: "Completed",
      value: completed,
    },
    {
      label: "Failed",
      value: failed,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{card.label}</p>

          <p className="mt-2 text-3xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}